import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { VendedorService } from './../../../services/vendedor.service';
import { VendedorLogin } from './../../../models/VendedorLogin';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  model = {} as VendedorLogin;

  constructor(
    private vendedorService: VendedorService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void { }

  public login(): void {
    this.vendedorService.login(this.model).subscribe(
      () => {
        this.router.navigateByUrl('/dashboard');
      },
      (error: any) => {
        if (error.status == 401)
          this.toaster.error('usuário ou senha inválido');
        else console.error(error);
      }
    );
  }
}
