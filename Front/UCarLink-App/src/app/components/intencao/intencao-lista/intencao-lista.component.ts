import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IntencaoService } from './../../../services/intencao.service';
import { Subject } from 'rxjs';
import { Pagination } from './../../../models/Pagination';
import { Intencao } from './../../../models/Intencao';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-intencao-lista',
  templateUrl: './intencao-lista.component.html',
  styleUrls: ['./intencao-lista.component.scss']
})
export class IntencaoListaComponent implements OnInit {

  modalRef!: BsModalRef;
  public intencoes: Intencao[] = [];
  public idIntencao = 0;
  public pagination = {} as Pagination;
  public intencoesFiltradas: Intencao[] = [];
  private _filtroLista: string = '';
  public idCliente = 0;

  termoBuscaChanged: Subject<string> = new Subject<string>();

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.intencoesFiltradas = (this.filtroLista ? this.filtrarIntencoes(this.filtroLista) : this.intencoes)
  }

  public filtrarIntencoes(filtrarPor: string): Intencao[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.intencoes.filter(
      (Intencao: any) => Intencao.Cliente.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        Intencao.Cliente.telefone.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private intencaoService: IntencaoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  public ngOnInit(): void {
    this.getintencoes();
  }

  public getintencoes(): void {
    this.spinner.show();
    this.intencaoService.getIntencoes().subscribe(
      (_intencoes: Intencao[]) => {
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

    this.intencaoService
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

  detalheIntencao(idClient: number){
    this.router.navigate([`intencao/detalhe/${idClient}`])
  }

}
