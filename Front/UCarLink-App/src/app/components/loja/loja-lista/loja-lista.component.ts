import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Loja } from '@app/models/Loja';
import { LojaService } from '@app/services/loja.service';
import { Pagination } from '@app/models/Pagination';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loja-lista',
  templateUrl: './loja-lista.component.html',
  styleUrls: ['./loja-lista.component.scss']
})

export class LojaListaComponent implements OnInit {
  modalRef!: BsModalRef;
  public lojas: Loja[] = [];
  public idLoja = 0;
  public pagination = {} as Pagination;
  public lojasFiltrados: Loja[] = [];
  private _filtroLista: string = '';

  termoBuscaChanged: Subject<string> = new Subject<string>();

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.lojasFiltrados = (this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.lojas)
  }

  public filtrarEventos(filtrarPor: string): Loja[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.lojas.filter(
      (loja: any) => loja.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private lojaService: LojaService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  public ngOnInit(): void {
    this.getCombustiveis();
 }

  public getCombustiveis(): void {
    this.spinner.show();
    this.lojaService.getLojas().subscribe(
      (_lojas: Loja[]) => {
        this.lojas = _lojas;
        this.lojasFiltrados = this.lojas;
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar os Combustiveis', 'Erro!');
      }
    )
      .add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, idLoja: number): void {
    event.stopPropagation();
    this.idLoja = idLoja;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.lojaService
      .deleteLoja(this.idLoja)
      .subscribe(
        (result: any) => {
          if (result.message === 'Deletado') {
            this.toastr.success(
              'O Loja foi deletado com Sucesso.',
              'Deletado!'
            );
            this.getCombustiveis();
          }
        },
        (error: any) => {
          console.error(error);
          this.toastr.error(
            `Erro ao tentar deletar o Loja ${this.idLoja}`,
            'Erro'
          );
        }
      )
      .add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef.hide();
  }

  detalheLoja(idLoja: number) {
    this.router.navigate([`loja/detalhe/${idLoja}`])
  }

}
