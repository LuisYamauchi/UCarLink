import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../../models/VendedorLogin';
import { AccountService } from '../../../services/vendedor.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  // model = {} as UserLogin;

  // constructor(
  //   private accountService: AccountService,
  //   private router: Router,
  //   private toaster: ToastrService
  // ) {}

  // ngOnInit(): void {}

  // public login(): void {
  //   this.accountService.login(this.model).subscribe(
  //     () => {
  //       this.router.navigateByUrl('/dashboard');
  //     },
  //     (error: any) => {
  //       if (error.status == 401)
  //         this.toaster.error('usuário ou senha inválido');
  //       else console.error(error);
  //     }
  //   );
  // }
}