import { Cliente } from '@app/models/Cliente';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '@app/services/cliente.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.scss'],
  providers: [DatePipe],
})

export class ClienteDetalheComponent implements OnInit {
  modalRef!: BsModalRef;
  idCliente!: number;
  cliente = {} as Cliente;
  form!: FormGroup;
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private clienteService: ClienteService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) {
    this.localeService.use('pt-br');
  }

  public carregarCliente(): void {
    this.idCliente = +(this.activatedRouter.snapshot.paramMap.get('idCliente') ?? '0');

    if (this.idCliente !== null && this.idCliente !== 0) {
      this.spinner.show();
      this.estadoSalvar = 'put';
      this.clienteService
        .getClienteByIdCliente(this.idCliente)
        .subscribe(
          (cliente: Cliente) => {
            this.cliente = { ...cliente };
            this.form.patchValue(this.cliente);
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar carregar cliente.', 'Erro!');
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  ngOnInit(): void {
    this.carregarCliente();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      telefone: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]]
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarCliente(): void {
    this.spinner.show();
    if (this.form.valid) {
      if (this.estadoSalvar === 'post') {
        this.cliente =
          this.estadoSalvar === 'post'
            ? { idCliente: 0, ...this.form.value }
            : { idCliente: this.cliente.idCliente, ...this.form.value };

        this.clienteService.post(this.cliente).subscribe(
          (clienteRetorno: Cliente) => {
            this.toastr.success('Cliente salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`clientes/lista`]);
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar cliente', 'Erro');
          },
          () => this.spinner.hide()
        );
      }
      else {
        this.cliente =
          this.estadoSalvar === 'post'
            ? { idCliente: 0, ...this.form.value }
            : { idCliente: this.cliente.idCliente, ...this.form.value };

        this.clienteService.put(this.cliente).subscribe(
          (clienteRetorno: Cliente) => {
            this.toastr.success('Cliente salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`clientes/detalhe/${clienteRetorno.idCliente}`]);
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar cliente', 'Erro');
          },
          () => this.spinner.hide()
        );
      }
    }
  }
}
