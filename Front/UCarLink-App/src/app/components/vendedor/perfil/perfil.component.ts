import { PaginatedResult } from './../../../models/Pagination';
import { LojaService } from './../../../services/loja.service';
import { Loja } from './../../../models/Loja';
import { NgxSpinnerService } from 'ngx-spinner';
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
  idVendedor = 0;
  public lojas: Loja[] = [];

  constructor(private fb: FormBuilder,
    private vendedorService: VendedorService,
    private lojaService: LojaService,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService) { }

  get f(): any { return this.form.controls; }

  get idLoja() {
    return (this.form.get('lojaIdLoja')?.value ?? 0);
  }


  ngOnInit(): void {
    this.carregarVendedor();
    this.validation();
  }

  public carregarVendedor(): void {

    var dados = localStorage.getItem('vendedor');

    const vendedorLogado = dados && JSON.parse(dados);

    this.idVendedor = vendedorLogado.idVendedor;

    if (this.idVendedor !== null && this.idVendedor !== 0) {
      this.spinner.show();
      this.vendedorService
        .getVendedorById(this.idVendedor)
        .subscribe(
          (vendedor: Vendedor) => {
            this.vendedor = { ...vendedor };
            this.form.patchValue(this.vendedor);
            this.carregarLojas();
          },
          (error: any) => {
            this.toaster.error('Erro ao tentar carregar vendedor.', 'Erro!');
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  public carregarLojas(): void {
    this.spinner.show();
    this.lojaService
      .getLojas()
      .subscribe(
        (_lojas: Loja[]) => {
          this.lojas = _lojas;
        },
        (error: any) => {
          this.toaster.error('Erro ao tentar carregar lojas.', 'Erro!');
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
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
      password: ['', Validators.required],
      confirmePassword: [''],
      lojaIdLoja: ['', Validators.required]
    }, formOptions);
  }

  register(): void {
    this.vendedor = { ...this.form.value };
    this.vendedorService.register(this.vendedor).subscribe(
      () => this.router.navigateByUrl('/dashboard'),
      (error: any) => this.toaster.error(error.error)
    )
  }

  salvarVendedor() {

    this.vendedor = { idVendedor: this.idVendedor, ...this.form.value };

    this.vendedorService.put(this.vendedor).subscribe(
      (vendedorRetorno: Vendedor) => {
        this.toaster.success('Vendedor salvo com Sucesso!', 'Sucesso');
        this.vendedor = vendedorRetorno;
        this.form.patchValue(this.vendedor);
      },
      (error: any) => {
        console.error(error);
        this.spinner.hide();
        this.toaster.error('Error ao salvar vendedor', 'Erro');
      },
      () => this.spinner.hide()
    );
  }
}
