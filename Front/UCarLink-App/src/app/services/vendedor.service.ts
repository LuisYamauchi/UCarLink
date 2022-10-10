import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Vendedor } from '../models/Vendedor';

@Injectable()
export class AccountService {
  private currentVendedorSource = new ReplaySubject<Vendedor>(1);
  public currentVendedor$ = this.currentVendedorSource.asObservable();

  baseUrl = environment.apiURL + 'api/account/'
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
    return this.http.get<Vendedor>(this.baseUrl + 'getVendedor').pipe(take(1));
  }

  updateVendedor(model: Vendedor): Observable<void> {
    return this.http.put<Vendedor>(this.baseUrl + 'updateVendedor', model).pipe(
      take(1),
      map((vendedor: Vendedor) => {
          this.setCurrentVendedor(vendedor);
        }
      )
    )
  }

  public register(model: any): Observable<void> {
    return this.http.post<Vendedor>(this.baseUrl + 'register', model).pipe(
      take(1),
      map((response: Vendedor) => {
        const vendedor = response;
        if (vendedor) {
          this.setCurrentVendedor(vendedor)
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('vendedor');
    //this.currentVendedorSource.next(null);
    this.currentVendedorSource.complete();
  }

  public setCurrentVendedor(vendedor: Vendedor): void {
    localStorage.setItem('vendedor', JSON.stringify(vendedor));
    this.currentVendedorSource.next(vendedor);
  }

  // postUpload(file: File): Observable<Vendedor> {
  //   const fileToUpload = file[0] as File;
  //   const formData = new FormData();
  //   formData.append('file', fileToUpload);

  //   return this.http
  //     .post<VendedorUpdate>(`${this.baseUrl}upload-image`, formData)
  //     .pipe(take(1));
  // }
}
