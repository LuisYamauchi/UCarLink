import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '@app/models/Cliente';
import { ClienteService } from '@app/services/cliente.service';
import { PaginatedResult, Pagination } from '@app/models/Pagination';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss']
})
export class ClienteListaComponent implements OnInit {
  modalRef!: BsModalRef;
  public clientes: Cliente[] = [];
  public idCliente = 0;
  public pagination = {} as Pagination;
  public clientesFiltrados: Cliente[] = [];
  // widthImg: number = 150;
  // marginImg: number = 2;
  // exibirImagem: boolean = true;
  private _filtroLista: string = '';

  termoBuscaChanged: Subject<string> = new Subject<string>();

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.clientesFiltrados = (this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.clientes)
  }

  public filtrarEventos(filtrarPor: string): Cliente[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.clientes.filter(
      (cliente: any) => cliente.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        cliente.telefone.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private clienteService: ClienteService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  public ngOnInit(): void {
    this.getClientes();
    // /** spinner starts on init */
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
  }

  // alterarImagem() : void {
  //   this.exibirImagem = !this.exibirImagem;
  // }

  public getClientes(): void {
    this.spinner.show();
    this.clienteService.getClientes().subscribe(
      (_clientes: Cliente[]) => {
        this.clientes = _clientes;
        this.clientesFiltrados = this.clientes;
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar os clientes', 'Erro!');
      }
    )
    .add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, idCliente: number): void {
    event.stopPropagation();
    this.idCliente = idCliente;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.clienteService
      .deleteCliente(this.idCliente)
      .subscribe(
        (result: any) => {
          if (result.message === 'Deletado') {
            this.toastr.success(
              'O cliente foi deletado com Sucesso.',
              'Deletado!'
            );
            this.getClientes();
          }
        },
        (error: any) => {
          console.error(error);
          this.toastr.error(
            `Erro ao tentar deletar o cliente ${this.idCliente}`,
            'Erro'
          );
        }
      )
      .add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef.hide();
  }

  detalheCliente(idClient: number){
    this.router.navigate([`clientes/detalhe/${idClient}`])
  }

}
