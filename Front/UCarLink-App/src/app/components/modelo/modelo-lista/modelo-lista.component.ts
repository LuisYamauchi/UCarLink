import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Modelo } from '@app/models/Modelo';
import { ModeloService } from '@app/services/modelo.service';
import { Pagination } from '@app/models/Pagination';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modelo-lista',
  templateUrl: './modelo-lista.component.html',
  styleUrls: ['./modelo-lista.component.scss']
})

export class ModeloListaComponent implements OnInit {
  modalRef!: BsModalRef;
  public modelos: Modelo[] = [];
  public idModelo = 0;
  public pagination = {} as Pagination;
  public modelosFiltrados: Modelo[] = [];
  private _filtroLista: string = '';

  termoBuscaChanged: Subject<string> = new Subject<string>();

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.modelosFiltrados = (this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.modelos)
  }

  public filtrarEventos(filtrarPor: string): Modelo[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.modelos.filter(
      (modelo: any) => modelo.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private modeloService: ModeloService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  public ngOnInit(): void {
    this.getCombustiveis();
 }

  public getCombustiveis(): void {
    this.spinner.show();
    this.modeloService.getModelos().subscribe(
      (_modelos: Modelo[]) => {
        this.modelos = _modelos;
        this.modelosFiltrados = this.modelos;
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar os Combustiveis', 'Erro!');
      }
    )
      .add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, idModelo: number): void {
    event.stopPropagation();
    this.idModelo = idModelo;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.modeloService
      .deleteModelo(this.idModelo)
      .subscribe(
        (result: any) => {
          if (result.message === 'Deletado') {
            this.toastr.success(
              'O Modelo foi deletado com Sucesso.',
              'Deletado!'
            );
            this.getCombustiveis();
          }
        },
        (error: any) => {
          console.error(error);
          this.toastr.error(
            `Erro ao tentar deletar o Modelo ${this.idModelo}`,
            'Erro'
          );
        }
      )
      .add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef.hide();
  }

  detalheModelo(idModelo: number) {
    this.router.navigate([`modelo/detalhe/${idModelo}`])
  }

}
