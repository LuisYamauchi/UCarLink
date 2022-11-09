import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Montadora } from '@app/models/Montadora';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class MontadoraService {
  baseURL = environment.apiURL + 'api/Montadora';

  constructor(private http: HttpClient) {}

  public getMontadorasByIdMontadora(idMontadora: number): Observable<Montadora> {
    return this.http.get<Montadora>(`${this.baseURL}/${idMontadora}`).pipe(take(1));
  }

  public getMontadoras(): Observable<Montadora[]> {
    return this.http.get<Montadora[]>(`${this.baseURL}`).pipe(take(1));
  }

  public saveMontadora(idMontadora: number, Montadoras: Montadora[]): Observable<Montadora[]> {
    return this.http
      .put<Montadora[]>(`${this.baseURL}/${idMontadora}`, Montadoras)
      .pipe(take(1));
  }

  public post(Montadora: Montadora): Observable<Montadora> {
    return this.http
      .post<Montadora>(this.baseURL, Montadora)
      .pipe(take(1));
  }

  public put(Montadora: Montadora): Observable<Montadora> {
    return this.http
      .put<Montadora>(`${this.baseURL}/${Montadora.idMontadora}`, Montadora)
      .pipe(take(1));
  }

  public deleteMontadora(idMontadora: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${idMontadora}`)
      .pipe(take(1));
  }
}
