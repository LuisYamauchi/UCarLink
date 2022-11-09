import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Combustivel } from '@app/models/Combustivel';
import { CombustivelService } from '@app/services/combustivel.service';
import { Pagination } from '@app/models/Pagination';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-combustivel-lista',
  templateUrl: './combustivel-lista.component.html',
  styleUrls: ['./combustivel-lista.component.scss']
})

export class CombustivelListaComponent implements OnInit {
  modalRef!: BsModalRef;
  public combustiveis: Combustivel[] = [];
  public idCombustivel = 0;
  public pagination = {} as Pagination;
  public combustiveisFiltrados: Combustivel[] = [];
  private _filtroLista: string = '';

  termoBuscaChanged: Subject<string> = new Subject<string>();

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.combustiveisFiltrados = (this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.combustiveis)
  }

  public filtrarEventos(filtrarPor: string): Combustivel[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.combustiveis.filter(
      (combustivel: any) => combustivel.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private combustivelService: CombustivelService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  public ngOnInit(): void {
    this.getCombustiveis();
 }

  public getCombustiveis(): void {
    this.spinner.show();
    this.combustivelService.getCombustiveis().subscribe(
      (_combustiveis: Combustivel[]) => {
        this.combustiveis = _combustiveis;
        this.combustiveisFiltrados = this.combustiveis;
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar os Combustiveis', 'Erro!');
      }
    )
      .add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, idCombustivel: number): void {
    event.stopPropagation();
    this.idCombustivel = idCombustivel;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.combustivelService
      .deleteCombustivel(this.idCombustivel)
      .subscribe(
        (result: any) => {
          if (result.message === 'Deletado') {
            this.toastr.success(
              'O Combustivel foi deletado com Sucesso.',
              'Deletado!'
            );
            this.getCombustiveis();
          }
        },
        (error: any) => {
          console.error(error);
          this.toastr.error(
            `Erro ao tentar deletar o Combustivel ${this.idCombustivel}`,
            'Erro'
          );
        }
      )
      .add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef.hide();
  }

  detalheCombustivel(idCombustivel: number) {
    this.router.navigate([`combustivel/detalhe/${idCombustivel}`])
  }

}
