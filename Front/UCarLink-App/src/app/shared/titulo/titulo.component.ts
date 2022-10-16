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
    else return this.titulo.toLocaleLowerCase();
  }
}
