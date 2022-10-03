import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {


  public clientes: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getClientes();
  }

  public getClientes(): void {

    this.http.get('https://localhost:5001/api/Clientes').subscribe(
      response => this.clientes = response,
      error => console.log(error)
    );
  }
}
