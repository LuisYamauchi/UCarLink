import { Cliente } from '@app/models/Cliente';
import { DatePipe } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '@app/services/cliente.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';
import { FormArray } from '@angular/forms';


@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.scss'],
  providers: [DatePipe],
})
export class ClienteDetalheComponent implements OnInit {

  form!: FormGroup;
  cliente = {} as Cliente;
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }
  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private clienteService: ClienteService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]),
      telefone: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)])
    });
  }
  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public resetForm(): void {
    this.form.reset();
  }

  public salvarCliente(): void {
    this.spinner.show();
    if (this.form.valid) {
      this.cliente =
        this.estadoSalvar === 'post'
          ? { idCliente: 0, ...this.form.value }
          : { idCliente: this.cliente.idCliente, ...this.form.value };

      this.clienteService.post(this.cliente).subscribe(
        (clienteRetorno: Cliente) => {
          this.toastr.success('Evento salvo com Sucesso!', 'Sucesso');
          this.router.navigate([`eventos/detalhe/${clienteRetorno.idCliente}`]);
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Error ao salvar evento', 'Erro');
        },
        () => this.spinner.hide()
      );
    }
  }
}
