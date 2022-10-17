import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CorVeiculo } from '@app/models/CorVeiculo';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class CorVeiculoService {
  baseURL = environment.apiURL + 'api/CorVeiculo';

  constructor(private http: HttpClient) {}

  public getCoresVeiculoByIdCorVeiculo(idCorVeiculo: number): Observable<CorVeiculo> {
    return this.http.get<CorVeiculo>(`${this.baseURL}/${idCorVeiculo}`).pipe(take(1));
  }

  public getCoresVeiculo(): Observable<CorVeiculo[]> {
    return this.http.get<CorVeiculo[]>(`${this.baseURL}`).pipe(take(1));
  }

  public saveCorVeiculo(idCorVeiculo: number, CorVeiculos: CorVeiculo[]): Observable<CorVeiculo[]> {
    return this.http
      .put<CorVeiculo[]>(`${this.baseURL}/${idCorVeiculo}`, CorVeiculos)
      .pipe(take(1));
  }

  public post(CorVeiculo: CorVeiculo): Observable<CorVeiculo> {
    return this.http
      .post<CorVeiculo>(this.baseURL, CorVeiculo)
      .pipe(take(1));
  }

  public put(CorVeiculo: CorVeiculo): Observable<CorVeiculo> {
    return this.http
      .put<CorVeiculo>(`${this.baseURL}/${CorVeiculo.idCorVeiculo}`, CorVeiculo)
      .pipe(take(1));
  }

  public deleteCorVeiculo(idCorVeiculo: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${idCorVeiculo}`)
      .pipe(take(1));
  }
}
