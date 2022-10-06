import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/Cliente';
import { ClienteService } from '../services/cliente.service';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

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

  constructor(private clienteService: ClienteService) { }

  public ngOnInit(): void {
    this.getClientes();
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
}
