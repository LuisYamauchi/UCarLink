import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { IntencaoDetalhes, TipoCambio, TipoIntencao } from '@app/models/Intencao';
import { Pagination } from '@app/models/Pagination';
import { IntencaoService } from '@app/services/intencao.service';
import { Cliente } from '@app/models/Cliente';
import { Modelo } from '@app/models/Modelo';
import { TipoVeiculo } from '@app/models/TipoVeiculo';
import { TipoPorta } from '@app/models/TipoPorta';
import { Combustivel } from '@app/models/Combustivel';
import { CorVeiculo } from '@app/models/CorVeiculo';
import { ClienteService } from '@app/services/cliente.service';
import { ModeloService } from '@app/services/modelo.service';
import { TipoVeiculoService } from '@app/services/tipo-veiculo.service';
import { TipoPortaService } from '@app/services/tipo-porta.service';
import { CombustivelService } from '@app/services/combustivel.service';
import { CorVeiculoService } from '@app/services/cor-veiculo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Consulta } from '@app/models/Consulta';
import { Loja } from '@app/models/Loja';
import { LojaService } from '@app/services/loja.service';

@Component({
  selector: 'app-intencao-lista',
  templateUrl: './intencao-lista.component.html',
  styleUrls: ['./intencao-lista.component.scss']
})
export class IntencaoListaComponent implements OnInit {
  public clientes: Cliente[] = [];
  public tiposIntencao: TipoIntencao[] = [];
  public modelos: Modelo[] = [];
  public tiposVeiculo: TipoVeiculo[] = [];
  public tiposPorta: TipoPorta[] = [];
  public combustiveis: Combustivel[] = [];
  public cores: CorVeiculo[] = [];
  public cambios: TipoCambio[] = [];
  public lojas: Loja[] = [];

  _arCondicionado!: boolean;
  _semArCondicionado!: boolean;
  _vidroEletrico!: boolean;
  _semVidroEletrico!: boolean;
  _travasEletricas!: boolean;
  _semTravasEletricas!: boolean;
  _alarme!: boolean;
  _semAlarme!: boolean;
  _som!: boolean;
  _semSom!: boolean;
  _direcaoEletrica!: boolean;
  _semDirecaoEletrica!: boolean;

  form!: FormGroup;
  modalRef!: BsModalRef;
  public intencoes: IntencaoDetalhes[] = [];
  public idIntencao = 0;
  public pagination = {} as Pagination;
  public intencoesFiltradas: IntencaoDetalhes[] = [];
  private _filtroLista: string = '';
  public idCliente = 0;

  consulta = {} as Consulta;

  termoBuscaChanged: Subject<string> = new Subject<string>();

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.intencoesFiltradas = (this.filtroLista ? this.filtrarIntencoes(this.filtroLista) : this.intencoes)
  }


  public get arCondicionado() {
    return this._arCondicionado;
  }

  public set arCondicionado(value: boolean) {
    this._arCondicionado = value;
    if (value)
      this.semArCondicionado = false;
  }

  public get semArCondicionado() {
    return this._semArCondicionado;
  }

  public set semArCondicionado(value: boolean) {
    this._semArCondicionado = value;
    if (value)
      this.arCondicionado = false;
  }

  public get vidroEletrico() {
    return this._vidroEletrico;
  }

  public set vidroEletrico(value: boolean) {
    this._vidroEletrico = value;
    if (value)
      this.semVidroEletrico = false;
  }

  public get semVidroEletrico() {
    return this._semVidroEletrico;
  }

  public set semVidroEletrico(value: boolean) {
    this._semVidroEletrico = value;
    if (value)
      this.vidroEletrico = false;
  }
  public get travasEletricas() {
    return this._travasEletricas;
  }

  public set travasEletricas(value: boolean) {
    this._travasEletricas = value;
    if (value)
      this.semTravasEletricas = false;
  }

  public get semTravasEletricas() {
    return this._semTravasEletricas;
  }

  public set semTravasEletricas(value: boolean) {
    this._semTravasEletricas = value;
    if (value)
      this.travasEletricas = false;
  }

  public get alarme() {
    return this._alarme;
  }

  public set alarme(value: boolean) {
    this._alarme = value;
    if (value)
      this.semAlarme = false;
  }

  public get semAlarme() {
    return this._semAlarme;
  }

  public set semAlarme(value: boolean) {
    this._semAlarme = value;
    if (value)
      this.alarme = false;
  }

  public get som() {
    return this._som;
  }

  public set som(value: boolean) {
    this._som = value;
    if (value)
      this.semSom = false;
  }

  public get semSom() {
    return this._semSom;
  }

  public set semSom(value: boolean) {
    this._semSom = value;
    if (value)
      this.som = false;
  }

  public get direcaoEletrica() {
    return this._direcaoEletrica;
  }

  public set direcaoEletrica(value: boolean) {
    this._direcaoEletrica = value;
    if (value)
      this.semDirecaoEletrica = false;
  }

  public get semDirecaoEletrica() {
    return this._semDirecaoEletrica;
  }

  public set semDirecaoEletrica(value: boolean) {
    this._semDirecaoEletrica = value;
    if (value)
      this.direcaoEletrica = false;
  }


  public filtrarIntencoes(filtrarPor: string): IntencaoDetalhes[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.intencoes.filter(
      (Intencao: IntencaoDetalhes) => Intencao.clienteNome.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        Intencao.modeloDescricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        Intencao.tipoPortaDescricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        Intencao.vendedorInclusaoNome.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        Intencao.tipoVeiculoDescricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        Intencao.combustivelDescricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        Intencao.corVeiculoDescricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private fb: FormBuilder,
    private _intencaoService: IntencaoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private clienteService: ClienteService,
    private modeloService: ModeloService,
    private tipoVeiculoService: TipoVeiculoService,
    private tipoPortaService: TipoPortaService,
    private combustivelService: CombustivelService,
    private corVeiculoService: CorVeiculoService,
    private lojaService: LojaService,
    private router: Router) { }

  public ngOnInit(): void {
    this._getintencoes();
    this.carregarClientes();
    this.tiposIntencao = [{ id: 0, descricao: 'COMPRA' }, { id: 1, descricao: 'VENDA' }];
    this.carregarModelo();
    this.carregarTipoVeiculo();
    this.carregarTipoPorta();
    this.carregarCombustivel();
    this.carregarCorVeiculo();
    this.carregarLojas();
    this.cambios = [{ id: 'MANUAL', descricao: 'MANUAL' }, { id: 'AUTOMÁTICO', descricao: 'AUTOMÁTICO' }];
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      compraVenda: [''],
      idLoja: [''],
      valorBuscaInicial: [''],
      valorBuscaFinal: [''],
      dataCadastro: [''],
      dataVencimento: [''],
      idModelo: [''],
      anoBuscaInicial: [''],
      anoBuscaFim: [''],
      idTipoVeiculo: [''],
      idTipoPorta: [''],
      idCombustivel: [''],
      idCorVeiculo: [''],
      cambio: [''],
      arCondicionado: [''],
      vidroEletrico: [''],
      travasEletricas: [''],
      alarme: [''],
      som: [''],
      direcaoEletrica: [''],
      kmBuscaInicial: [''],
      kmBuscaFinal: [''],
    });
  }

  public resetForm(): void {
    this.form.reset();
    this.arCondicionado = false;
    this.semArCondicionado = false;
    this.vidroEletrico = false;
    this.semVidroEletrico = false;
    this.travasEletricas = false;
    this.semTravasEletricas = false;
    this.alarme = false;
    this.semAlarme = false;
    this.som = false;
    this.semSom = false;
    this.direcaoEletrica = false;
    this.semDirecaoEletrica = false;
  }

  private preparaIntencao(): void {
    this.consulta = {
      ...this.form.value
    };

    this.consulta.arCondicionado = this.arCondicionado ? 'S' : this.semArCondicionado ? 'N' : '';
    this.consulta.vidroEletrico = this.vidroEletrico ? 'S' : this.semVidroEletrico ? 'N' : '';
    this.consulta.travasEletricas = this.travasEletricas ? 'S' : this.semTravasEletricas ? 'N' : '';
    this.consulta.alarme = this.alarme ? 'S' : this.semAlarme ? 'N' : '';
    this.consulta.som = this.som ? 'S' : this.semSom ? 'N' : '';
    this.consulta.direcaoEletrica = this.direcaoEletrica ? 'S' : this.semDirecaoEletrica ? 'N' : '';
  }

  public getintencoes(): void {
    this.spinner.show();
    this.preparaIntencao();
    this._intencaoService.getConsultaDetalhes(this.consulta).subscribe(
      (_intencoes: IntencaoDetalhes[]) => {
        this.intencoes = _intencoes;
        this.intencoesFiltradas = this.intencoes;
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar os intenções', 'Erro!');
      }
    )
      .add(() => this.spinner.hide());
  }

  public _getintencoes(): void {
    this.spinner.show();
    this._intencaoService.getIntencoesDetalhes().subscribe(
      (_intencoes: IntencaoDetalhes[]) => {
        this.intencoes = _intencoes;
        this.intencoesFiltradas = this.intencoes;
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar os intenções', 'Erro!');
      }
    )
      .add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, idIntencao: number): void {
    event.stopPropagation();
    this.idIntencao = idIntencao;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this._intencaoService
      .deleteIntencao(this.idIntencao)
      .subscribe(
        (result: any) => {
          if (result.message === 'Deletado') {
            this.toastr.success(
              'A Intenção foi deletada com Sucesso.',
              'Deletado!'
            );
            this.getintencoes();
          }
        },
        (error: any) => {
          console.error(error);
          this.toastr.error(
            `Erro ao tentar deletar o Intenção ${this.idIntencao}`,
            'Erro'
          );
        }
      )
      .add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef.hide();
  }

  detalheIntencao(idClient: number) {
    this.router.navigate([`intencao/detalhe/${idClient}`])
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
          this.toastr.error('Erro ao tentar carregar clientes.', 'Erro!');
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
          this.toastr.error('Erro ao tentar carregar modelos.', 'Erro!');
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
          this.toastr.error('Erro ao tentar carregar tipos de veículo.', 'Erro!');
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
          this.toastr.error('Erro ao tentar carregar tipos de porta.', 'Erro!');
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
          this.toastr.error('Erro ao tentar carregar combustiveis.', 'Erro!');
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
          this.toastr.error('Erro ao tentar carregar cores.', 'Erro!');
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }
  public carregarLojas(): void {
    this.spinner.show();
    this.lojaService
      .getLojas()
      .subscribe(
        (_lojas: Loja[]) => {
          this.lojas = _lojas;
        },
        (error: any) => {
          this.toastr.error('Erro ao tentar carregar lojas.', 'Erro!');
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }
}
