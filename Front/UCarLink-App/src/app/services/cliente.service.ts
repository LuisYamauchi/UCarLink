import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';
import { take, map } from 'rxjs/operators';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable(
  // { providedIn: 'root' }
)
export class ClienteService {
  baseURL = environment.apiURL + 'api/Cliente';

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

  public post(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post<Cliente>(this.baseURL, cliente)
      .pipe(take(1));
  }

  public put(cliente: Cliente): Observable<Cliente> {
    return this.http
      .put<Cliente>(`${this.baseURL}/${cliente.idCliente}`, cliente)
      .pipe(take(1));
  }

  public deleteCliente(idCliente: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${idCliente}`)
      .pipe(take(1));
  }
}
