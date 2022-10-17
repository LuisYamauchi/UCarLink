import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TipoPorta } from '@app/models/TipoPorta';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class TipoPortaService {
  baseURL = environment.apiURL + 'api/TipoPorta';

  constructor(private http: HttpClient) {}

  public getTiposPortaByIdTipoPorta(idTipoPorta: number): Observable<TipoPorta> {
    return this.http.get<TipoPorta>(`${this.baseURL}/${idTipoPorta}`).pipe(take(1));
  }

  public getTiposPorta(): Observable<TipoPorta[]> {
    return this.http.get<TipoPorta[]>(`${this.baseURL}`).pipe(take(1));
  }

  public saveTipoPorta(idTipoPorta: number, TipoPortas: TipoPorta[]): Observable<TipoPorta[]> {
    return this.http
      .put<TipoPorta[]>(`${this.baseURL}/${idTipoPorta}`, TipoPortas)
      .pipe(take(1));
  }

  public post(TipoPorta: TipoPorta): Observable<TipoPorta> {
    return this.http
      .post<TipoPorta>(this.baseURL, TipoPorta)
      .pipe(take(1));
  }

  public put(TipoPorta: TipoPorta): Observable<TipoPorta> {
    return this.http
      .put<TipoPorta>(`${this.baseURL}/${TipoPorta.idTipoPorta}`, TipoPorta)
      .pipe(take(1));
  }

  public deleteTipoPorta(idTipoPorta: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${idTipoPorta}`)
      .pipe(take(1));
  }
}
