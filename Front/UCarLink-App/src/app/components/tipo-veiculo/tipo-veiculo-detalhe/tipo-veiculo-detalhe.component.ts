import { TipoVeiculo } from '@app/models/TipoVeiculo';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoVeiculoService } from '@app/services/tipo-veiculo.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-tipo-veiculo-detalhe',
  templateUrl: './tipo-veiculo-detalhe.component.html',
  styleUrls: ['./tipo-veiculo-detalhe.component.scss'],
  providers: [DatePipe],
})

export class TipoVeiculoDetalheComponent implements OnInit {
  modalRef!: BsModalRef;
  idTipoVeiculo!: number;
  tipoVeiculo = {} as TipoVeiculo;
  form!: FormGroup;
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private tipoVeiculoService: TipoVeiculoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) {
    this.localeService.use('pt-br');
  }

  public carregarTipoVeiculo(): void {
    this.idTipoVeiculo = +(this.activatedRouter.snapshot.paramMap.get('idTipoVeiculo') ?? '0');

    if (this.idTipoVeiculo !== null && this.idTipoVeiculo !== 0) {
      this.spinner.show();
      this.estadoSalvar = 'put';
      this.tipoVeiculoService
        .getTiposVeiculoByIdTipoVeiculo(this.idTipoVeiculo)
        .subscribe(
          (tipoVeiculo: TipoVeiculo) => {
            this.tipoVeiculo = { ...tipoVeiculo };
            this.form.patchValue(this.tipoVeiculo);
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
    this.carregarTipoVeiculo();
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

  public salvarTipoVeiculo(): void {
    this.spinner.show();
    if (this.form.valid) {
      if (this.estadoSalvar === 'post') {
        this.tipoVeiculo = { idTipoVeiculo: 0, ...this.form.value };
        this.tipoVeiculoService.post(this.tipoVeiculo).subscribe(
          (tipoVeiculoRetorno: TipoVeiculo) => {
            this.toastr.success('Cor salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`tipoVeiculo/lista`]);
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
        this.tipoVeiculo = { idTipoVeiculo: this.tipoVeiculo.idTipoVeiculo, ...this.form.value };
        this.tipoVeiculoService.put(this.tipoVeiculo).subscribe(
          (TipoVeiculoRetorno: TipoVeiculo) => {
            this.toastr.success('TipoVeiculo salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`tipoVeiculo/detalhe/${TipoVeiculoRetorno.idTipoVeiculo}`]);
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
