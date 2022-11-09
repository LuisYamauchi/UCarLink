import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {

  @Input() titulo!: string;
  @Input() iconClass = 'fa fa-user';
  @Input() subtitulo = '';
  @Input() botaoListar = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  listar(): void {
    this.router.navigate([`/${this.obterRota()}/lista`]);
  }

  obterRota(): string{
    if (this.titulo.toLocaleLowerCase() === 'intenções')
    return 'intencao';
    if (this.titulo.toLocaleLowerCase() === 'combustíveis')
    return 'combustivel';
    if (this.titulo.toLocaleLowerCase() === 'cores')
    return 'corVeiculo';
    if (this.titulo.toLocaleLowerCase() === 'lojas')
    return 'loja';
    if (this.titulo.toLocaleLowerCase() === 'modelos')
    return 'modelo';
    if (this.titulo.toLocaleLowerCase() === 'marcas')
    return 'montadora';
    if (this.titulo.toLocaleLowerCase() === 'tipos de portas')
    return 'tipoPorta';
    if (this.titulo.toLocaleLowerCase() === 'tipos de veículos')
    return 'tipoVeiculo';
    else return this.titulo.toLocaleLowerCase();
  }
}
