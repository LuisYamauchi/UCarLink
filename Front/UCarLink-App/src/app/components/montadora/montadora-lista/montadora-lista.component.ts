import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Montadora } from '@app/models/Montadora';
import { MontadoraService } from '@app/services/montadora.service';
import { Pagination } from '@app/models/Pagination';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-montadora-lista',
  templateUrl: './montadora-lista.component.html',
  styleUrls: ['./montadora-lista.component.scss']
})

export class MontadoraListaComponent implements OnInit {
  modalRef!: BsModalRef;
  public montadoras: Montadora[] = [];
  public idMontadora = 0;
  public pagination = {} as Pagination;
  public montadorasFiltrados: Montadora[] = [];
  private _filtroLista: string = '';

  termoBuscaChanged: Subject<string> = new Subject<string>();

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.montadorasFiltrados = (this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.montadoras)
  }

  public filtrarEventos(filtrarPor: string): Montadora[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.montadoras.filter(
      (montadora: any) => montadora.descricao.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private montadoraService: MontadoraService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  public ngOnInit(): void {
    this.getCombustiveis();
 }

  public getCombustiveis(): void {
    this.spinner.show();
    this.montadoraService.getMontadoras().subscribe(
      (_montadoras: Montadora[]) => {
        this.montadoras = _montadoras;
        this.montadorasFiltrados = this.montadoras;
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar os Combustiveis', 'Erro!');
      }
    )
      .add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, idMontadora: number): void {
    event.stopPropagation();
    this.idMontadora = idMontadora;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.montadoraService
      .deleteMontadora(this.idMontadora)
      .subscribe(
        (result: any) => {
          if (result.message === 'Deletado') {
            this.toastr.success(
              'O Montadora foi deletado com Sucesso.',
              'Deletado!'
            );
            this.getCombustiveis();
          }
        },
        (error: any) => {
          console.error(error);
          this.toastr.error(
            `Erro ao tentar deletar o Montadora ${this.idMontadora}`,
            'Erro'
          );
        }
      )
      .add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef.hide();
  }

  detalheMontadora(idMontadora: number) {
    this.router.navigate([`montadora/detalhe/${idMontadora}`])
  }

}
