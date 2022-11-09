import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CorVeiculo } from '@app/models/CorVeiculo';
import { CorVeiculoService } from '@app/services/cor-veiculo.service';
import { Pagination } from '@app/models/Pagination';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cor-veiculo-lista',
  templateUrl: './cor-veiculo-lista.component.html',
  styleUrls: ['./cor-veiculo-lista.component.scss']
})

export class CorVeiculoListaComponent implements OnInit {
  modalRef!: BsModalRef;
  public coresVeiculo: CorVeiculo[] = [];
  public idCorVeiculo = 0;
  public pagination = {} as Pagination;
  public coresVeiculoFiltrados: CorVeiculo[] = [];
  private _filtroLista: string = '';

  termoBuscaChanged: Subject<string> = new Subject<string>();

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.coresVeiculoFiltrados = (this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.coresVeiculo)
  }

  public filtrarEventos(filtrarPor: string): CorVeiculo[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.coresVeiculo.filter(
      (corVeiculo: any) => corVeiculo.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private corVeiculoService: CorVeiculoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  public ngOnInit(): void {
    this.getCoresVeiculo();
 }

  public getCoresVeiculo(): void {
    this.spinner.show();
    this.corVeiculoService.getCoresVeiculo().subscribe(
      (_coresVeiculo: CorVeiculo[]) => {
        this.coresVeiculo = _coresVeiculo;
        this.coresVeiculoFiltrados = this.coresVeiculo;
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar os cores', 'Erro!');
      }
    )
      .add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, idCorVeiculo: number): void {
    event.stopPropagation();
    this.idCorVeiculo = idCorVeiculo;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.corVeiculoService
      .deleteCorVeiculo(this.idCorVeiculo)
      .subscribe(
        (result: any) => {
          if (result.message === 'Deletado') {
            this.toastr.success(
              'O CorVeiculo foi deletado com Sucesso.',
              'Deletado!'
            );
            this.getCoresVeiculo();
          }
        },
        (error: any) => {
          console.error(error);
          this.toastr.error(
            `Erro ao tentar deletar o CorVeiculo ${this.idCorVeiculo}`,
            'Erro'
          );
        }
      )
      .add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef.hide();
  }

  detalheCorVeiculo(idCorVeiculo: number) {
    this.router.navigate([`corVeiculo/detalhe/${idCorVeiculo}`])
  }

}
