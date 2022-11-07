import { CorVeiculo } from './../../../models/CorVeiculo';
import { Combustivel } from './../../../models/Combustivel';
import { TipoPorta } from './../../../models/TipoPorta';
import { TipoVeiculo } from './../../../models/TipoVeiculo';
import { Modelo } from './../../../models/Modelo';
import { Cliente } from './../../../models/Cliente';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteService } from './../../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IntencaoService } from './../../../services/intencao.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Intencao, TipoCambio, TipoIntencao } from './../../../models/Intencao';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { ModeloService } from '@app/services/modelo.service';
import { TipoVeiculoService } from '@app/services/tipo-veiculo.service';
import { TipoPortaService } from '@app/services/tipo-porta.service';
import { CombustivelService } from '@app/services/combustivel.service';
import { CorVeiculoService } from '@app/services/cor-veiculo.service';

@Component({
  selector: 'app-intencao-detalhe',
  templateUrl: './intencao-detalhe.component.html',
  styleUrls: ['./intencao-detalhe.component.scss']
})
export class IntencaoDetalheComponent implements OnInit {
  public clientes: Cliente[] = [];
  public tiposIntencao: TipoIntencao[] = [];
  public modelos: Modelo[] = [];
  public tiposVeiculo: TipoVeiculo[] = [];
  public tiposPorta: TipoPorta[] = [];
  public combustiveis: Combustivel[] = [];
  public cores: CorVeiculo[] = [];
  public cambios: TipoCambio[] = [];

  modalRef!: BsModalRef;
  idIntencao!: number;
  intencao = {} as Intencao;
  form!: FormGroup;
  estadoSalvar = 'post';
  idVendedor!: 0;
  arCondicionado!: boolean;
  vidroEletrico!: boolean;
  travasEletricas!: boolean;
  alarme!: boolean;
  som!: boolean;
  direcaoEletrica!: boolean;

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
  get idCliente() {
    return (this.form.get('clienteIdCliente')?.value ?? 0);
  }
  get idTipoIntencao() {
    return (this.form.get('compraVenda')?.value ?? 0);
  }
  get idModelo() {
    return (this.form.get('modeloIdModelo')?.value ?? 0);
  }
  get idTipoVeiculo() {
    return (this.form.get('tipoVeiculoIdTipoVeiculo')?.value ?? 0);
  }
  get idTipoPorta() {
    return (this.form.get('tipoPortaIdTipoPorta')?.value ?? 0);
  }
  get idCombustivel() {
    return (this.form.get('combustivelIdCombustivel')?.value ?? 0);
  }
  get idCorVeiculo() {
    return (this.form.get('corVeiculoIdCorVeiculo')?.value ?? 0);
  }
  get idCambio() {
    return (this.form.get('cambio')?.value ?? 'MANUAL');
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private intencaoService: IntencaoService,
    private clienteService: ClienteService,
    private modeloService: ModeloService,
    private tipoVeiculoService: TipoVeiculoService,
    private tipoPortaService: TipoPortaService,
    private combustivelService: CombustivelService,
    private corVeiculoService: CorVeiculoService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router) {
    this.localeService.use('pt-br');
  }

  public carregarIntencao(): void {
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
            this.arCondicionado = intencao.arCondicionado === 'S';
            this.vidroEletrico = intencao.vidroEletrico === 'S';
            this.travasEletricas = intencao.travasEletricas === 'S';
            this.alarme = intencao.alarme === 'S';
            this.som = intencao.som === 'S';
            this.direcaoEletrica = intencao.direcaoEletrica === 'S';
          },
          (error: any) => {
            this.toaster.error('Erro ao tentar carregar intenção.', 'Erro!');
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  ngOnInit(): void {
    this.preparaTela();
  }

  public preparaTela() {
    this.carregarIntencao();
    this.validation();
    this.carregarClientes();
    this.tiposIntencao = [{ id: 0, descricao: 'COMPRA' }, { id: 1, descricao: 'VENDA' }];
    this.carregarModelo();
    this.carregarTipoVeiculo();
    this.carregarTipoPorta();
    this.carregarCombustivel();
    this.carregarCorVeiculo();
    this.cambios = [{ id: 'MANUAL', descricao: 'MANUAL' }, { id: 'AUTOMÁTICO', descricao: 'AUTOMÁTICO' }];
    this.carregaVendedor();
  }

  public carregaVendedor(): void {
    var dados = localStorage.getItem('vendedor');
    const vendedorLogado = dados && JSON.parse(dados);
    this.idVendedor = vendedorLogado.idVendedor;
  }

  public validation(): void {
    this.form = this.fb.group({
      clienteIdCliente: ['', [Validators.required]],
      compraVenda: ['', [Validators.required]],
      valorInicial: ['', [Validators.required]],
      valorFinal: ['', [Validators.required]],
      valorVeiculo: [''],
      dataCadastro: [''],
      dataVencimento: [''],
      modeloIdModelo: ['', [Validators.required]],
      anoInicial: [''],
      anoFinal: [''],
      tipoVeiculoIdTipoVeiculo: ['', [Validators.required]],
      tipoPortaIdTipoPorta: ['', [Validators.required]],
      combustivelIdCombustivel: ['', [Validators.required]],
      corVeiculoIdCorVeiculo: ['', [Validators.required]],
      cambio: [''],
      arCondicionado: [''],
      vidroEletrico: [''],
      travasEletricas: [''],
      alarme: [''],
      som: [''],
      direcaoEletrica: [''],
      kmInicial: [''],
      kmFinal: [''],
      KmAtual: [''],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  private preparaIntencao(): void {
    this.intencao = {
      idIntencao: this.estadoSalvar === 'post' ? 0 : this.intencao.idIntencao,
      vendedorInclusaoIdVendedor: this.idVendedor,
      vendedorNegociacaoIdVendedor: this.idVendedor,
      ...this.form.value
    };

    this.intencao.arCondicionado = this.arCondicionado ? 'S' : 'N';
    this.intencao.vidroEletrico = this.vidroEletrico ? 'S' : 'N';
    this.intencao.travasEletricas = this.travasEletricas ? 'S' : 'N';
    this.intencao.alarme = this.alarme ? 'S' : 'N';
    this.intencao.som = this.som ? 'S' : 'N';
    this.intencao.direcaoEletrica = this.direcaoEletrica ? 'S' : 'N';
  }

  public salvarIntencao(): void {
    this.spinner.show();
    if (this.form.valid) {
      this.preparaIntencao();
      if (this.estadoSalvar === 'post') {
        this.intencaoService.post(this.intencao).subscribe(
          (intencaoRetorno: Intencao) => {
            this.toaster.success('Inteção salva com Sucesso!', 'Sucesso');
            this.router.navigate([`intencao/lista`]);
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toaster.error('Error ao salvar intenção', 'Erro');
          },
          () => this.spinner.hide()
        );
      }
      else {
        this.intencaoService.put(this.intencao).subscribe(
          (intencaoRetorno: Intencao) => {
            this.toaster.success('Intenção salva com Sucesso!', 'Sucesso');
            this.router.navigate([`intencao/detalhe/${intencaoRetorno.idIntencao}`]);
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toaster.error('Error ao salvar intenção', 'Erro');
          },
          () => this.spinner.hide()
        );
      }
    }
  }

  public carregarClientes(): void {
    this.spinner.show();
    this.clienteService
      .getClientes()
      .subscribe(
        (_clientes: Cliente[]) => {
          this.clientes = _clientes;
        },
        (error: any) => {
          this.toaster.error('Erro ao tentar carregar clientes.', 'Erro!');
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  public carregarModelo(): void {
    this.spinner.show();
    this.modeloService
      .getModelos()
      .subscribe(
        (_modelos: Modelo[]) => {
          this.modelos = _modelos;
        },
        (error: any) => {
          this.toaster.error('Erro ao tentar carregar modelos.', 'Erro!');
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  public carregarTipoVeiculo(): void {
    this.spinner.show();
    this.tipoVeiculoService
      .getTiposVeiculo()
      .subscribe(
        (_tiposVeiculo: TipoVeiculo[]) => {
          this.tiposVeiculo = _tiposVeiculo;
        },
        (error: any) => {
          this.toaster.error('Erro ao tentar carregar tipos de veículo.', 'Erro!');
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  public carregarTipoPorta(): void {
    this.spinner.show();
    this.tipoPortaService
      .getTiposPorta()
      .subscribe(
        (_tiposPorta: TipoPorta[]) => {
          this.tiposPorta = _tiposPorta;
        },
        (error: any) => {
          this.toaster.error('Erro ao tentar carregar tipos de porta.', 'Erro!');
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  public carregarCombustivel(): void {
    this.spinner.show();
    this.combustivelService
      .getCombustiveis()
      .subscribe(
        (_combustiveis: Combustivel[]) => {
          this.combustiveis = _combustiveis;
        },
        (error: any) => {
          this.toaster.error('Erro ao tentar carregar combustiveis.', 'Erro!');
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  public carregarCorVeiculo(): void {
    this.spinner.show();
    this.corVeiculoService
      .getCoresVeiculo()
      .subscribe(
        (_coresVeiculo: CorVeiculo[]) => {
          this.cores = _coresVeiculo;
        },
        (error: any) => {
          this.toaster.error('Erro ao tentar carregar cores.', 'Erro!');
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }
}

