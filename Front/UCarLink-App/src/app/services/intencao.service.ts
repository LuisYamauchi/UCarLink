import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Intencao, IntencaoDetalhes } from '@app/models/Intencao';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Consulta } from '@app/models/Consulta';

@Injectable()
export class IntencaoService {
  baseURL = environment.apiURL + 'api/intencao';

  constructor(private http: HttpClient) {}

  public getIntencoesByIdIntencao(idIntencao: number): Observable<Intencao> {
    return this.http.get<Intencao>(`${this.baseURL}/${idIntencao}`).pipe(take(1));
  }

  public getIntencoes(): Observable<Intencao[]> {
    return this.http.get<Intencao[]>(`${this.baseURL}`).pipe(take(1));
  }

  public getIntencoesDetalhes(): Observable<IntencaoDetalhes[]> {
    return this.http.get<IntencaoDetalhes[]>(`${this.baseURL}/detalhes`).pipe(take(1));
  }
  public getConsultaDetalhes(consulta: Consulta): Observable<IntencaoDetalhes[]> {
    return this.http.post<IntencaoDetalhes[]>(`${environment.apiURL}api/Consulta/Detalhes`, consulta).pipe(take(1));
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
