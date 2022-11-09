import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TipoVeiculo } from '@app/models/TipoVeiculo';
import { TipoVeiculoService } from '@app/services/tipo-veiculo.service';
import { Pagination } from '@app/models/Pagination';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tipo-veiculo-lista',
  templateUrl: './tipo-veiculo-lista.component.html',
  styleUrls: ['./tipo-veiculo-lista.component.scss']
})

export class TipoVeiculoListaComponent implements OnInit {
  modalRef!: BsModalRef;
  public tiposVeiculo: TipoVeiculo[] = [];
  public idTipoVeiculo = 0;
  public pagination = {} as Pagination;
  public tiposVeiculoFiltrados: TipoVeiculo[] = [];
  private _filtroLista: string = '';

  termoBuscaChanged: Subject<string> = new Subject<string>();

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.tiposVeiculoFiltrados = (this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.tiposVeiculo)
  }

  public filtrarEventos(filtrarPor: string): TipoVeiculo[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.tiposVeiculo.filter(
      (tipoVeiculo: any) => tipoVeiculo.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private tipoVeiculoService: TipoVeiculoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  public ngOnInit(): void {
    this.getCoresVeiculo();
 }

  public getCoresVeiculo(): void {
    this.spinner.show();
    this.tipoVeiculoService.getTiposVeiculo().subscribe(
      (_tiposVeiculo: TipoVeiculo[]) => {
        this.tiposVeiculo = _tiposVeiculo;
        this.tiposVeiculoFiltrados = this.tiposVeiculo;
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar os tipos de veiculos', 'Erro!');
      }
    )
      .add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, idTipoVeiculo: number): void {
    event.stopPropagation();
    this.idTipoVeiculo = idTipoVeiculo;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.tipoVeiculoService
      .deleteTipoVeiculo(this.idTipoVeiculo)
      .subscribe(
        (result: any) => {
          if (result.message === 'Deletado') {
            this.toastr.success(
              'O TipoVeiculo foi deletado com Sucesso.',
              'Deletado!'
            );
            this.getCoresVeiculo();
          }
        },
        (error: any) => {
          console.error(error);
          this.toastr.error(
            `Erro ao tentar deletar o TipoVeiculo ${this.idTipoVeiculo}`,
            'Erro'
          );
        }
      )
      .add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef.hide();
  }

  detalheTipoVeiculo(idTipoVeiculo: number) {
    this.router.navigate([`tipoVeiculo/detalhe/${idTipoVeiculo}`])
  }

}
