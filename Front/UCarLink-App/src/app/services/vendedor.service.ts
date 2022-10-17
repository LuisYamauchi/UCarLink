import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Vendedor } from '../models/Vendedor';

@Injectable()
export class VendedorService {
  private currentVendedorSource = new ReplaySubject<Vendedor>(1);
  public currentVendedor$ = this.currentVendedorSource.asObservable();

  baseUrl = environment.apiURL + 'api/vendedor/'
  constructor(private http: HttpClient) { }

  public login(model: any): Observable<void> {
    return this.http.post<Vendedor>(this.baseUrl + 'login', model).pipe(
      take(1),
      map((response: Vendedor) => {
        const vendedor = response;
        if (vendedor) {
          this.setCurrentVendedor(vendedor)
        }
      })
    );
  }

  getVendedor(): Observable<Vendedor> {
    return this.http.get<Vendedor>(this.baseUrl).pipe(take(1));
  }

  getVendedorById(idVendedor: number): Observable<Vendedor> {
    return this.http.get<Vendedor>(this.baseUrl + `${idVendedor}`).pipe(take(1));
  }

  public put(vendedor: Vendedor): Observable<Vendedor> {
    return this.http
      .put<Vendedor>(`${this.baseUrl}${vendedor.idVendedor}`, vendedor)
      .pipe(take(1));
  }


  public register(model: any): Observable<void> {
    return this.http.post<Vendedor>(this.baseUrl, model).pipe(
      take(1),
      map((response: Vendedor) => {
        const vendedor = response;
        if (vendedor) {
          this.setCurrentVendedor(vendedor)
        }
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('vendedor');
    //this.currentVendedorSource.next(null);
    this.currentVendedorSource.complete();
  }

  public setCurrentVendedor(vendedor: Vendedor): void {
    localStorage.setItem('vendedor', JSON.stringify(vendedor));
    this.currentVendedorSource.next(vendedor);
  }
}
