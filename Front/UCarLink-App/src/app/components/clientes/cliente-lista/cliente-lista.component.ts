import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss']
})
export class ClienteListaComponent implements OnInit {

  modalRef!: BsModalRef;

  public clientes: Cliente[] = [];
  public clientesFiltrados: Cliente[] = [];
  // widthImg: number = 150;
  // marginImg: number = 2;
  // exibirImagem: boolean = true;
  private _filtroLista: string = '';

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

    this.clienteService.getClientes().subscribe(
      (_clientes: Cliente[]) => {
        this.clientes = _clientes;
        this.clientesFiltrados = this.clientes;
      },
      error => console.log(error)
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.toastr.success('O cliente foi deletado com sucesso!', 'Deletado!');
  }

  decline(): void {
    this.modalRef.hide();
  }

  detalheCliente(idClient: number){
    this.router.navigate([`clientes/detalhe/${idClient}`])
  }

}
