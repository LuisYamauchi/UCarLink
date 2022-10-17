import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TipoVeiculo } from '@app/models/TipoVeiculo';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class TipoVeiculoService {
  baseURL = environment.apiURL + 'api/TipoVeiculo';

  constructor(private http: HttpClient) {}

  public getTiposVeiculoByIdTipoVeiculo(idTipoVeiculo: number): Observable<TipoVeiculo> {
    return this.http.get<TipoVeiculo>(`${this.baseURL}/${idTipoVeiculo}`).pipe(take(1));
  }

  public getTiposVeiculo(): Observable<TipoVeiculo[]> {
    return this.http.get<TipoVeiculo[]>(`${this.baseURL}`).pipe(take(1));
  }

  public saveTipoVeiculo(idTipoVeiculo: number, TipoVeiculos: TipoVeiculo[]): Observable<TipoVeiculo[]> {
    return this.http
      .put<TipoVeiculo[]>(`${this.baseURL}/${idTipoVeiculo}`, TipoVeiculos)
      .pipe(take(1));
  }

  public post(TipoVeiculo: TipoVeiculo): Observable<TipoVeiculo> {
    return this.http
      .post<TipoVeiculo>(this.baseURL, TipoVeiculo)
      .pipe(take(1));
  }

  public put(TipoVeiculo: TipoVeiculo): Observable<TipoVeiculo> {
    return this.http
      .put<TipoVeiculo>(`${this.baseURL}/${TipoVeiculo.idTipoVeiculo}`, TipoVeiculo)
      .pipe(take(1));
  }

  public deleteTipoVeiculo(idTipoVeiculo: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${idTipoVeiculo}`)
      .pipe(take(1));
  }
}
