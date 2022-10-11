import { ValidatorField } from './../../../helpers/ValidatorField';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/vendedor.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Vendedor } from 'src/app/models/Vendedor';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  // vendedor = {} as Vendedor;
  // form!: FormGroup;

  // constructor(private fb: FormBuilder,
  //             private accountService: AccountService,
  //             private router: Router,
  //             private toaster: ToastrService) { }

  // get f(): any { return this.form.controls; }

  // ngOnInit(): void {
  //   this.validation();
  // }

  // private validation(): void {

  //   const formOptions: AbstractControlOptions = {
  //     validators: ValidatorField.MustMatch('password', 'confirmePassword')
  //   };

  //   this.form = this.fb.group({
  //     primeiroNome: ['', Validators.required],
  //     ultimoNome: ['', Validators.required],
  //     email: ['',
  //       [Validators.required, Validators.email]
  //     ],
  //     userName: ['', Validators.required],
  //     password: ['',
  //       [Validators.required, Validators.minLength(4)]
  //     ],
  //     confirmePassword: ['', Validators.required],
  //   }, formOptions);
  // }

  // register(): void {
  //   this.vendedor = { ...this.form.value };
  //   this.accountService.register(this.vendedor).subscribe(
  //     () => this.router.navigateByUrl('/dashboard'),
  //     (error: any) => this.toaster.error(error.error)
  //   )
  // }

}
