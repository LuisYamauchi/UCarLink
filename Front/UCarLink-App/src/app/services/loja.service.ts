import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loja } from '../models/Loja';
import { take, map } from 'rxjs/operators';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable(
  // { providedIn: 'root' }
)
export class LojaService {
  baseURL = environment.apiURL + 'api/Lojas';

  constructor(private http: HttpClient) { }

  public getLojas(): Observable<Loja[]> {
    return this.http.get<Loja[]>(this.baseURL);
  }

  public getLojaByNome(nome: string): Observable<Loja[]> {
    return this.http.get<Loja[]>(`${this.baseURL}/${nome}/nome`);
  }

  public getLojaByIdLoja(idLoja: number): Observable<Loja> {
    return this.http.get<Loja>(`${this.baseURL}/${idLoja}`);
  }

  public post(Loja: Loja): Observable<Loja> {
    return this.http
      .post<Loja>(this.baseURL, Loja)
      .pipe(take(1));
  }

  public put(Loja: Loja): Observable<Loja> {
    return this.http
      .put<Loja>(`${this.baseURL}/${Loja.idLoja}`, Loja)
      .pipe(take(1));
  }

  public deleteLoja(idLoja: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${idLoja}`)
      .pipe(take(1));
  }
}
