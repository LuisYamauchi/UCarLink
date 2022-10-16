import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Intencao } from '@app/models/Intencao';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class IntencaoService {
  baseURL = 'https://localhost:5001/api/intencoes';

  constructor(private http: HttpClient) {}

  public getIntencoesByIdIntencao(idIntencao: number): Observable<Intencao> {
    return this.http.get<Intencao>(`${this.baseURL}/${idIntencao}`).pipe(take(1));
  }

  public getIntencoes(): Observable<Intencao[]> {
    return this.http.get<Intencao[]>(`${this.baseURL}`).pipe(take(1));
  }

  public saveIntencao(idIntencao: number, Intencoes: Intencao[]): Observable<Intencao[]> {
    return this.http
      .put<Intencao[]>(`${this.baseURL}/${idIntencao}`, Intencoes)
      .pipe(take(1));
  }

  public post(intencao: Intencao): Observable<Intencao> {
    return this.http
      .post<Intencao>(this.baseURL, intencao)
      .pipe(take(1));
  }

  public put(intencao: Intencao): Observable<Intencao> {
    return this.http
      .put<Intencao>(`${this.baseURL}/${intencao.idIntencao}`, intencao)
      .pipe(take(1));
  }

  public deleteIntencao(idintencao: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${idintencao}`)
      .pipe(take(1));
  }
}
