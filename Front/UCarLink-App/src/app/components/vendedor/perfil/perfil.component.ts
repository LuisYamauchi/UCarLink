import { ValidatorField } from './../../../helpers/ValidatorField';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { VendedorService } from './../../../services/vendedor.service';
import { Vendedor } from '@app/models/Vendedor';
import { FormGroup, FormBuilder, AbstractControlOptions, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  vendedor = {} as Vendedor;
  form!: FormGroup;

  constructor(private fb: FormBuilder,
    private vendedorService: VendedorService,
    private router: Router,
    private toaster: ToastrService) { }

    get f(): any { return this.form.controls; }

  ngOnInit(): void {
    this.validation();
  }

   private validation(): void {

     const formOptions: AbstractControlOptions = {
       validators: ValidatorField.MustMatch('password', 'confirmePassword')
     };

     this.form = this.fb.group({
       nome: ['', Validators.required],
       email: ['',
         [Validators.required, Validators.email]
       ],
       usuario: ['', Validators.required],
       password: ['',
         [Validators.required, Validators.minLength(4)]
       ],
       confirmePassword: ['', Validators.required],
     }, formOptions);
   }



   register(): void {
     this.vendedor = { ...this.form.value };
     this.vendedorService.register(this.vendedor).subscribe(
       () => this.router.navigateByUrl('/dashboard'),
       (error: any) => this.toaster.error(error.error)
     )
   }


}
