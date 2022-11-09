import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TipoPorta } from '@app/models/TipoPorta';
import { TipoPortaService } from '@app/services/tipo-porta.service';
import { Pagination } from '@app/models/Pagination';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tipo-porta-lista',
  templateUrl: './tipo-porta-lista.component.html',
  styleUrls: ['./tipo-porta-lista.component.scss']
})

export class TipoPortaListaComponent implements OnInit {
  modalRef!: BsModalRef;
  public tiposPorta: TipoPorta[] = [];
  public idTipoPorta = 0;
  public pagination = {} as Pagination;
  public tiposPortaFiltrados: TipoPorta[] = [];
  private _filtroLista: string = '';

  termoBuscaChanged: Subject<string> = new Subject<string>();

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.tiposPortaFiltrados = (this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.tiposPorta)
  }

  public filtrarEventos(filtrarPor: string): TipoPorta[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.tiposPorta.filter(
      (tipoPorta: any) => tipoPorta.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private tipoPortaService: TipoPortaService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  public ngOnInit(): void {
    this.getCoresVeiculo();
 }

  public getCoresVeiculo(): void {
    this.spinner.show();
    this.tipoPortaService.getTiposPorta().subscribe(
      (_tiposPorta: TipoPorta[]) => {
        this.tiposPorta = _tiposPorta;
        this.tiposPortaFiltrados = this.tiposPorta;
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar os tipos de portas', 'Erro!');
      }
    )
      .add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, idTipoPorta: number): void {
    event.stopPropagation();
    this.idTipoPorta = idTipoPorta;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.tipoPortaService
      .deleteTipoPorta(this.idTipoPorta)
      .subscribe(
        (result: any) => {
          if (result.message === 'Deletado') {
            this.toastr.success(
              'O TipoPorta foi deletado com Sucesso.',
              'Deletado!'
            );
            this.getCoresVeiculo();
          }
        },
        (error: any) => {
          console.error(error);
          this.toastr.error(
            `Erro ao tentar deletar o TipoPorta ${this.idTipoPorta}`,
            'Erro'
          );
        }
      )
      .add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef.hide();
  }

  detalheTipoPorta(idTipoPorta: number) {
    this.router.navigate([`tipoPorta/detalhe/${idTipoPorta}`])
  }

}
