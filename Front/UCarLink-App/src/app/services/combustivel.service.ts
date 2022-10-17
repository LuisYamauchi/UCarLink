import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Combustivel } from '@app/models/Combustivel';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class CombustivelService {
  baseURL = environment.apiURL + 'api/Combustivel';

  constructor(private http: HttpClient) {}

  public getCombustiveisByIdCombustivel(idCombustivel: number): Observable<Combustivel> {
    return this.http.get<Combustivel>(`${this.baseURL}/${idCombustivel}`).pipe(take(1));
  }

  public getCombustiveis(): Observable<Combustivel[]> {
    return this.http.get<Combustivel[]>(`${this.baseURL}`).pipe(take(1));
  }

  public saveCombustivel(idCombustivel: number, Combustivels: Combustivel[]): Observable<Combustivel[]> {
    return this.http
      .put<Combustivel[]>(`${this.baseURL}/${idCombustivel}`, Combustivels)
      .pipe(take(1));
  }

  public post(Combustivel: Combustivel): Observable<Combustivel> {
    return this.http
      .post<Combustivel>(this.baseURL, Combustivel)
      .pipe(take(1));
  }

  public put(Combustivel: Combustivel): Observable<Combustivel> {
    return this.http
      .put<Combustivel>(`${this.baseURL}/${Combustivel.idCombustivel}`, Combustivel)
      .pipe(take(1));
  }

  public deleteCombustivel(idCombustivel: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${idCombustivel}`)
      .pipe(take(1));
  }
}
