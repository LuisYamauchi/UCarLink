import { Intencao } from './../../../models/Intencao';
import { IntencaoService } from './../../../services/intencao.service';
import { Cliente } from '@app/models/Cliente';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '@app/services/cliente.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.scss'],
  providers: [DatePipe],
})

export class ClienteDetalheComponent implements OnInit {
  modalRef!: BsModalRef;
  idCliente!: number;
  cliente = {} as Cliente;
  form!: FormGroup;
  estadoSalvar = 'post';
  // intencaoAtual = { idIntencao: 0, nome: '', indice: 0 };
  // template!: TemplateRef<any>;

  // get modoEditar(): boolean {
  //   return this.estadoSalvar === 'put';
  // }

  // get intencoes(): FormArray {
  //   return this.form.get('intecoes') as FormArray;
  // }


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
    private clienteService: ClienteService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    // private intencaoService: IntencaoService,
    // private modalService: BsModalService,
    private router: Router) {
    this.localeService.use('pt-br');
  }

  public carregarCliente(): void {
    this.idCliente = +(this.activatedRouter.snapshot.paramMap.get('idCliente') ?? '0');

    if (this.idCliente !== null && this.idCliente !== 0) {
      this.spinner.show();
      this.estadoSalvar = 'put';
      this.clienteService
        .getClienteByIdCliente(this.idCliente)
        .subscribe(
          (cliente: Cliente) => {
            this.cliente = { ...cliente };
            this.form.patchValue(this.cliente);
            //this.carregarIntencoes();
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar carregar cliente.', 'Erro!');
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  // public carregarIntencoes(): void {
  //   this.intencaoService
  //     .getIntencoesByIdCliente(this.idCliente)
  //     .subscribe(
  //       (intencoesRetorno: Intencao[]) => {
  //         intencoesRetorno.forEach((intencao) => {
  //           this.intencoes.push(this.criarIntencao(intencao));
  //         });
  //       },
  //       (error: any) => {
  //         this.toastr.error('Erro ao tentar carregar intenções', 'Erro');
  //         console.error(error);
  //       }
  //     )
  //     .add(() => this.spinner.hide());
  // }

  // adicionarIntencao(): void {
  //   this.intencoes.push(this.criarIntencao({ idIntencao: 0 } as Intencao));
  // }

  // criarIntencao(intencao: Intencao): FormGroup {
  //   return this.fb.group({
  //     idIntencao: [intencao.idIntencao],
  //     cliente: [intencao.cliente, Validators.required],
  //     compraVenda: [intencao.compraVenda, Validators.required],
  //     vendedorInclusao: [intencao.vendedorInclusao, Validators.required],
  //     valorInicial: [intencao.valorInicial],
  //     valorFinal: [intencao.valorFinal],
  //     valorVeiculo: [intencao.valorVeiculo],
  //     dataCadastro: [intencao.dataCadastro],
  //     dataVencimento: [intencao.dataVencimento],
  //     modelo: [intencao.modelo],
  //     anoInicial: [intencao.anoInicial],
  //     anoFinal: [intencao.anoFinal],
  //     tipoVeiculo: [intencao.tipoVeiculo],
  //     tipoPorta: [intencao.tipoPorta],
  //     combustivel: [intencao.combustivel],
  //     corVeiculo: [intencao.corVeiculo],
  //     cambio: [intencao.cambio],
  //     arCondicionado: [intencao.arCondicionado],
  //     vidroEletrico: [intencao.vidroEletrico],
  //     travasEletricas: [intencao.travasEletricas],
  //     alarme: [intencao.alarme],
  //     som: [intencao.som],
  //     direcaoEletrica: [intencao.direcaoEletrica],
  //     kmInicial: [intencao.kmInicial],
  //     kmFinal: [intencao.kmFinal],
  //   });
  // }


  // public mudarValorData(value: Date, indice: number, campo: string): void {
  //   this.intencoes.value[indice][campo] = value;
  // }

  // public salvarIntencoes(): void {
  //   if (this.form.controls['intencoes'].valid) {
  //     this.spinner.show();
  //     this.intencaoService
  //       .saveIntencao(this.idCliente, this.form.value.Intencao)
  //       .subscribe(
  //         () => {
  //           this.toastr.success('Intenções salvas com Sucesso!', 'Sucesso!');
  //         },
  //         (error: any) => {
  //           this.toastr.error('Erro ao tentar salvar intenções.', 'Erro');
  //           console.error(error);
  //         }
  //       )
  //       .add(() => this.spinner.hide());
  //   }
  // }

  // public removerIntencao(template: TemplateRef<any>, indice: number): void {
  //   this.intencaoAtual.idIntencao = +(this.intencoes.get(indice + '.idIntencao') ?? 0);
  //   // this.intencaoAtual.nome = this.lotes.get(indice + '.nome').value;
  //    this.intencaoAtual.indice = indice;

  //   this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  // }

  // confirmDeleteIntencao(): void {
  //   this.modalRef.hide();
  //   this.spinner.show();

  //   this.intencaoService
  //     .deleteIntencao(this.idCliente, this.intencaoAtual.idIntencao)
  //     .subscribe(
  //       () => {
  //         this.toastr.success('Intenção deletada com sucesso', 'Sucesso');
  //         this.intencoes.removeAt(this.intencaoAtual.indice);
  //       },
  //       (error: any) => {
  //         this.toastr.error(
  //           `Erro ao tentar deletar a intenção ${this.intencaoAtual.idIntencao}`,
  //           'Erro'
  //         );
  //         console.error(error);
  //       }
  //     )
  //     .add(() => this.spinner.hide());
  // }

  // declineDeleteIntencao(): void {
  //   this.modalRef.hide();
  // }

  ngOnInit(): void {
    this.carregarCliente();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      telefone: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      // intencoes: this.fb.array([]),
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarCliente(): void {
    this.spinner.show();
    if (this.form.valid) {
      if (this.estadoSalvar === 'post') {
        this.cliente = { idCliente: 0, ...this.form.value };
        this.clienteService.post(this.cliente).subscribe(
          (clienteRetorno: Cliente) => {
            this.toastr.success('Cliente salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`clientes/lista`]);
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar cliente', 'Erro');
          },
          () => this.spinner.hide()
        );
      }
      else {
        this.cliente = { idCliente: this.cliente.idCliente, ...this.form.value };
        this.clienteService.put(this.cliente).subscribe(
          (clienteRetorno: Cliente) => {
            this.toastr.success('Cliente salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`clientes/detalhe/${clienteRetorno.idCliente}`]);
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar cliente', 'Erro');
          },
          () => this.spinner.hide()
        );
      }
    }
  }
}
