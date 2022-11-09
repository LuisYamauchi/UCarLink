import { CorVeiculo } from '@app/models/CorVeiculo';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { CorVeiculoService } from '@app/services/cor-veiculo.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cor-veiculo-detalhe',
  templateUrl: './cor-veiculo-detalhe.component.html',
  styleUrls: ['./cor-veiculo-detalhe.component.scss'],
  providers: [DatePipe],
})

export class CorVeiculoDetalheComponent implements OnInit {
  modalRef!: BsModalRef;
  idCorVeiculo!: number;
  corVeiculo = {} as CorVeiculo;
  form!: FormGroup;
  estadoSalvar = 'post';

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private corVeiculoService: CorVeiculoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) {
    this.localeService.use('pt-br');
  }

  public carregarCorVeiculo(): void {
    this.idCorVeiculo = +(this.activatedRouter.snapshot.paramMap.get('idCorVeiculo') ?? '0');

    if (this.idCorVeiculo !== null && this.idCorVeiculo !== 0) {
      this.spinner.show();
      this.estadoSalvar = 'put';
      this.corVeiculoService
        .getCoresVeiculoByIdCorVeiculo(this.idCorVeiculo)
        .subscribe(
          (corVeiculo: CorVeiculo) => {
            this.corVeiculo = { ...corVeiculo };
            this.form.patchValue(this.corVeiculo);
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
    this.carregarCorVeiculo();
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

  public salvarCorVeiculo(): void {
    this.spinner.show();
    if (this.form.valid) {
      if (this.estadoSalvar === 'post') {
        this.corVeiculo = { idCorVeiculo: 0, ...this.form.value };
        this.corVeiculoService.post(this.corVeiculo).subscribe(
          (corVeiculoRetorno: CorVeiculo) => {
            this.toastr.success('Cor salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`corVeiculo/lista`]);
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
        this.corVeiculo = { idCorVeiculo: this.corVeiculo.idCorVeiculo, ...this.form.value };
        this.corVeiculoService.put(this.corVeiculo).subscribe(
          (CorVeiculoRetorno: CorVeiculo) => {
            this.toastr.success('CorVeiculo salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`corVeiculo/detalhe/${CorVeiculoRetorno.idCorVeiculo}`]);
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
