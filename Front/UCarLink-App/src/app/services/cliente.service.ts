import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';

@Injectable(
  // { providedIn: 'root' }
)
export class ClienteService {

  baseURL = 'https://localhost:5001/api/Clientes';

  constructor(private http: HttpClient) { }

  public getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseURL);
  }

  public getClienteByNome(nome: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseURL}/${nome}/nome`);
  }

  public getClienteByIdCliente(idCliente: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseURL}/${idCliente}`);
  }
}
