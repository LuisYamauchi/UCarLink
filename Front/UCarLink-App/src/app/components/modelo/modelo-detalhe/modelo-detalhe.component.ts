import { Modelo } from '@app/models/Modelo';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloService } from '@app/services/modelo.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modelo-detalhe',
  templateUrl: './modelo-detalhe.component.html',
  styleUrls: ['./modelo-detalhe.component.scss'],
  providers: [DatePipe],
})

export class ModeloDetalheComponent implements OnInit {
  modalRef!: BsModalRef;
  idModelo!: number;
  modelo = {} as Modelo;
  form!: FormGroup;
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private modeloService: ModeloService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) {
    this.localeService.use('pt-br');
  }

  public carregarModelo(): void {
    this.idModelo = +(this.activatedRouter.snapshot.paramMap.get('idModelo') ?? '0');

    if (this.idModelo !== null && this.idModelo !== 0) {
      this.spinner.show();
      this.estadoSalvar = 'put';
      this.modeloService
        .getModelosByIdModelo(this.idModelo)
        .subscribe(
          (modelo: Modelo) => {
            this.modelo = { ...modelo };
            this.form.patchValue(this.modelo);
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar carregar Combustível.', 'Erro!');
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  ngOnInit(): void {
    this.carregarModelo();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]]
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarModelo(): void {
    this.spinner.show();
    if (this.form.valid) {
      if (this.estadoSalvar === 'post') {
        this.modelo = { idModelo: 0, ...this.form.value };
        this.modeloService.post(this.modelo).subscribe(
          (modeloRetorno: Modelo) => {
            this.toastr.success('Combustível salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`modelo/lista`]);
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar Combustível', 'Erro');
          },
          () => this.spinner.hide()
        );
      }
      else {
        this.modelo = { idModelo: this.modelo.idModelo, ...this.form.value };
        this.modeloService.put(this.modelo).subscribe(
          (ModeloRetorno: Modelo) => {
            this.toastr.success('Modelo salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`modelo/detalhe/${ModeloRetorno.idModelo}`]);
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar Combustível', 'Erro');
          },
          () => this.spinner.hide()
        );
      }
    }
  }
}
