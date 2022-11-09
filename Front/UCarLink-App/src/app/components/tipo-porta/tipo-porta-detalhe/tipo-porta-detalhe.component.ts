import { TipoPorta } from '@app/models/TipoPorta';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoPortaService } from '@app/services/tipo-porta.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-tipo-porta-detalhe',
  templateUrl: './tipo-porta-detalhe.component.html',
  styleUrls: ['./tipo-porta-detalhe.component.scss'],
  providers: [DatePipe],
})

export class TipoPortaDetalheComponent implements OnInit {
  modalRef!: BsModalRef;
  idTipoPorta!: number;
  tipoPorta = {} as TipoPorta;
  form!: FormGroup;
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private tipoPortaService: TipoPortaService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) {
    this.localeService.use('pt-br');
  }

  public carregarTipoPorta(): void {
    this.idTipoPorta = +(this.activatedRouter.snapshot.paramMap.get('idTipoPorta') ?? '0');

    if (this.idTipoPorta !== null && this.idTipoPorta !== 0) {
      this.spinner.show();
      this.estadoSalvar = 'put';
      this.tipoPortaService
        .getTiposPortaByIdTipoPorta(this.idTipoPorta)
        .subscribe(
          (tipoPorta: TipoPorta) => {
            this.tipoPorta = { ...tipoPorta };
            this.form.patchValue(this.tipoPorta);
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar carregar Cor.', 'Erro!');
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  ngOnInit(): void {
    this.carregarTipoPorta();
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

  public salvarTipoPorta(): void {
    this.spinner.show();
    if (this.form.valid) {
      if (this.estadoSalvar === 'post') {
        this.tipoPorta = { idTipoPorta: 0, ...this.form.value };
        this.tipoPortaService.post(this.tipoPorta).subscribe(
          (tipoPortaRetorno: TipoPorta) => {
            this.toastr.success('Cor salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`tipoPorta/lista`]);
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar Cor', 'Erro');
          },
          () => this.spinner.hide()
        );
      }
      else {
        this.tipoPorta = { idTipoPorta: this.tipoPorta.idTipoPorta, ...this.form.value };
        this.tipoPortaService.put(this.tipoPorta).subscribe(
          (TipoPortaRetorno: TipoPorta) => {
            this.toastr.success('TipoPorta salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`tipoPorta/detalhe/${TipoPortaRetorno.idTipoPorta}`]);
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar Cor', 'Erro');
          },
          () => this.spinner.hide()
        );
      }
    }
  }
}
