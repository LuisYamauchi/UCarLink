import { Montadora } from '@app/models/Montadora';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { MontadoraService } from '@app/services/montadora.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-montadora-detalhe',
  templateUrl: './montadora-detalhe.component.html',
  styleUrls: ['./montadora-detalhe.component.scss'],
  providers: [DatePipe],
})

export class MontadoraDetalheComponent implements OnInit {
  modalRef!: BsModalRef;
  idMontadora!: number;
  montadora = {} as Montadora;
  form!: FormGroup;
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private montadoraService: MontadoraService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) {
    this.localeService.use('pt-br');
  }

  public carregarMontadora(): void {
    this.idMontadora = +(this.activatedRouter.snapshot.paramMap.get('idMontadora') ?? '0');

    if (this.idMontadora !== null && this.idMontadora !== 0) {
      this.spinner.show();
      this.estadoSalvar = 'put';
      this.montadoraService
        .getMontadorasByIdMontadora(this.idMontadora)
        .subscribe(
          (montadora: Montadora) => {
            this.montadora = { ...montadora };
            this.form.patchValue(this.montadora);
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar carregar Marca.', 'Erro!');
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  ngOnInit(): void {
    this.carregarMontadora();
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

  public salvarMontadora(): void {
    this.spinner.show();
    if (this.form.valid) {
      if (this.estadoSalvar === 'post') {
        this.montadora = { idMontadora: 0, ...this.form.value };
        this.montadoraService.post(this.montadora).subscribe(
          (montadoraRetorno: Montadora) => {
            this.toastr.success('Marca salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`montadora/lista`]);
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar Marca', 'Erro');
          },
          () => this.spinner.hide()
        );
      }
      else {
        this.montadora = { idMontadora: this.montadora.idMontadora, ...this.form.value };
        this.montadoraService.put(this.montadora).subscribe(
          (MontadoraRetorno: Montadora) => {
            this.toastr.success('Montadora salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`montadora/detalhe/${MontadoraRetorno.idMontadora}`]);
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar Marca', 'Erro');
          },
          () => this.spinner.hide()
        );
      }
    }
  }
}
