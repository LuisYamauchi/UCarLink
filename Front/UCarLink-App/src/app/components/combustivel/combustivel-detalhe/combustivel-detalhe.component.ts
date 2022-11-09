import { Combustivel } from '@app/models/Combustivel';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { CombustivelService } from '@app/services/combustivel.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-combustivel-detalhe',
  templateUrl: './combustivel-detalhe.component.html',
  styleUrls: ['./combustivel-detalhe.component.scss'],
  providers: [DatePipe],
})

export class CombustivelDetalheComponent implements OnInit {
  modalRef!: BsModalRef;
  idCombustivel!: number;
  combustivel = {} as Combustivel;
  form!: FormGroup;
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private combustivelService: CombustivelService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) {
    this.localeService.use('pt-br');
  }

  public carregarCombustivel(): void {
    this.idCombustivel = +(this.activatedRouter.snapshot.paramMap.get('idCombustivel') ?? '0');

    if (this.idCombustivel !== null && this.idCombustivel !== 0) {
      this.spinner.show();
      this.estadoSalvar = 'put';
      this.combustivelService
        .getCombustiveisByIdCombustivel(this.idCombustivel)
        .subscribe(
          (combustivel: Combustivel) => {
            this.combustivel = { ...combustivel };
            this.form.patchValue(this.combustivel);
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
    this.carregarCombustivel();
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

  public salvarCombustivel(): void {
    this.spinner.show();
    if (this.form.valid) {
      if (this.estadoSalvar === 'post') {
        this.combustivel = { idCombustivel: 0, ...this.form.value };
        this.combustivelService.post(this.combustivel).subscribe(
          (combustivelRetorno: Combustivel) => {
            this.toastr.success('Combustível salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`combustivel/lista`]);
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
        this.combustivel = { idCombustivel: this.combustivel.idCombustivel, ...this.form.value };
        this.combustivelService.put(this.combustivel).subscribe(
          (CombustivelRetorno: Combustivel) => {
            this.toastr.success('Combustivel salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`combustivel/detalhe/${CombustivelRetorno.idCombustivel}`]);
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
