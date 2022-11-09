import { Loja } from '@app/models/Loja';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { LojaService } from '@app/services/loja.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-loja-detalhe',
  templateUrl: './loja-detalhe.component.html',
  styleUrls: ['./loja-detalhe.component.scss'],
  providers: [DatePipe],
})

export class LojaDetalheComponent implements OnInit {
  modalRef!: BsModalRef;
  idLoja!: number;
  loja = {} as Loja;
  form!: FormGroup;
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private lojaService: LojaService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) {
    this.localeService.use('pt-br');
  }

  public carregarLoja(): void {
    this.idLoja = +(this.activatedRouter.snapshot.paramMap.get('idLoja') ?? '0');

    if (this.idLoja !== null && this.idLoja !== 0) {
      this.spinner.show();
      this.estadoSalvar = 'put';
      this.lojaService
        .getLojaByIdLoja(this.idLoja)
        .subscribe(
          (loja: Loja) => {
            this.loja = { ...loja };
            this.form.patchValue(this.loja);
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
    this.carregarLoja();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]]
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarLoja(): void {
    this.spinner.show();
    if (this.form.valid) {
      if (this.estadoSalvar === 'post') {
        this.loja = { idLoja: 0, ...this.form.value };
        this.lojaService.post(this.loja).subscribe(
          (lojaRetorno: Loja) => {
            this.toastr.success('Combustível salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`loja/lista`]);
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
        this.loja = { idLoja: this.loja.idLoja, ...this.form.value };
        this.lojaService.put(this.loja).subscribe(
          (LojaRetorno: Loja) => {
            this.toastr.success('Loja salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`loja/detalhe/${LojaRetorno.idLoja}`]);
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
