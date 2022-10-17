import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Modelo } from '@app/models/Modelo';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class ModeloService {
  baseURL = environment.apiURL + 'api/Modelo';

  constructor(private http: HttpClient) {}

  public getModelosByIdModelo(idModelo: number): Observable<Modelo> {
    return this.http.get<Modelo>(`${this.baseURL}/${idModelo}`).pipe(take(1));
  }

  public getModelos(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(`${this.baseURL}`).pipe(take(1));
  }

  public saveModelo(idModelo: number, Modelos: Modelo[]): Observable<Modelo[]> {
    return this.http
      .put<Modelo[]>(`${this.baseURL}/${idModelo}`, Modelos)
      .pipe(take(1));
  }

  public post(Modelo: Modelo): Observable<Modelo> {
    return this.http
      .post<Modelo>(this.baseURL, Modelo)
      .pipe(take(1));
  }

  public put(Modelo: Modelo): Observable<Modelo> {
    return this.http
      .put<Modelo>(`${this.baseURL}/${Modelo.idModelo}`, Modelo)
      .pipe(take(1));
  }

  public deleteModelo(idModelo: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${idModelo}`)
      .pipe(take(1));
  }
}
