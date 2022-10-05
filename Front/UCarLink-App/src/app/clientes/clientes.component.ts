import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  public clientes: any = [];
  public clientesFiltrados: any = [];
  // widthImg: number = 150;
  // marginImg: number = 2;
  // exibirImagem: boolean = true;
  private _filtroLista: string = '';

  public get filtroLista(){
    return this._filtroLista;
  }

  public set filtroLista(value: string){
    this._filtroLista =value;
    this.clientesFiltrados = (this.filtroLista ? this.filtrarEventos(this.filtroLista): this.clientes)
  }

  filtrarEventos(filtrarPor:string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.clientes.filter(
      (cliente: any) => cliente.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      cliente.telefone.toLocaleLowerCase().indexOf(filtrarPor) !== -1

    )
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getClientes();
  }


  // alterarImagem(){
  //   this.exibirImagem = !this.exibirImagem;
  // }

  public getClientes(): void {

    this.http.get('https://localhost:5001/api/Clientes').subscribe(
      response => {
        this.clientes = response;
        this.clientesFiltrados = this.clientes;
      },
      error => console.log(error)
    );
  }
}
