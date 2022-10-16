import { Cliente } from './../../../models/Cliente';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteService } from './../../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IntencaoService } from './../../../services/intencao.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Intencao } from './../../../models/Intencao';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intencao-detalhe',
  templateUrl: './intencao-detalhe.component.html',
  styleUrls: ['./intencao-detalhe.component.scss']
})
export class IntencaoDetalheComponent implements OnInit {
  public clientes: Cliente[] = [];
  modalRef!: BsModalRef;
  idIntencao!: number;
  intencao = {} as Intencao;
  form!: FormGroup;
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private intencaoService: IntencaoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) {
    this.localeService.use('pt-br');
  }

  public carregarCliente(): void {
    this.idIntencao = +(this.activatedRouter.snapshot.paramMap.get('idIntencao') ?? '0');

    if (this.idIntencao !== null && this.idIntencao !== 0) {
      this.spinner.show();
      this.estadoSalvar = 'put';
      this.intencaoService
        .getIntencoesByIdIntencao(this.idIntencao)
        .subscribe(
          (intencao: Intencao) => {
            this.intencao = { ...intencao };
            this.form.patchValue(this.intencao);
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar carregar intenção.', 'Erro!');
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  ngOnInit(): void {
    this.carregarCliente();
    this.validation();
    this.clientes = [{idCliente: 1, nome: 'Teste', telefone: '12123542'}, {idCliente: 2, nome: 'Teste 2', telefone: '12123542'}];
  }

  public validation(): void {
    this.form = this.fb.group({
      cliente: this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
        telefone: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      }),
      compraVenda: ['', [Validators.required]],
      vendedorInclusao: this.fb.group({

      }),
      vendedorNegociacao: this.fb.group({

      }),
      valorInicial: ['', [Validators.required]],
      valorFinal: ['', [Validators.required]],
      valorVeiculo: ['', [Validators.required]],
      dataCadastro: ['', [Validators.required]],
      dataVencimento: [''],
      modelo: this.fb.group({

      }),
      anoInicial: [''],
      anoFinal: [''],
      tipoVeiculo: this.fb.group({

      }),
      tipoPorta: this.fb.group({

      }),
      combustivel: this.fb.group({

      }),
      corVeiculo: this.fb.group({

      }),
      cambio: ['', [Validators.required]],
      arCondicionado:  ['', [Validators.required]],
      vidroEletrico: ['', [Validators.required]],
      travasEletricas: ['', [Validators.required]],
      alarme: ['', [Validators.required]],
      som: ['', [Validators.required]],
      direcaoEletrica: ['', [Validators.required]],
      kmInicial: ['', [Validators.required]],
      kmFinal: ['', [Validators.required]],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarIntencao(): void {
    this.spinner.show();
    if (this.form.valid) {
      if (this.estadoSalvar === 'post') {
        this.intencao =
          this.estadoSalvar === 'post'
            ? { idIntencao: 0, ...this.form.value }
            : { idIntencao: this.intencao.idIntencao, ...this.form.value };

        this.intencaoService.post(this.intencao).subscribe(
          (intencaoRetorno: Intencao) => {
            this.toastr.success('Inteção salva com Sucesso!', 'Sucesso');
            this.router.navigate([`intencao/lista`]);
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar intenção', 'Erro');
          },
          () => this.spinner.hide()
        );
      }
      else {
        this.intencao =
          this.estadoSalvar === 'post'
            ? { iIintencao: 0, ...this.form.value }
            : { idIntencao: this.intencao.idIntencao, ...this.form.value };

        this.intencaoService.put(this.intencao).subscribe(
          (intencaoRetorno: Intencao) => {
            this.toastr.success('Intenção salva com Sucesso!', 'Sucesso');
            this.router.navigate([`intencao/detalhe/${intencaoRetorno.idIntencao}`]);
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar intenção', 'Erro');
          },
          () => this.spinner.hide()
        );
      }
    }
  }

}
