import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  nomeVendedor!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {

    var dados = localStorage.getItem('vendedor');

    const vendedorLogado = dados && JSON.parse(dados);

    this.nomeVendedor = vendedorLogado.nome;
  }
  showMenu(): boolean {
    return this.router.url != '/user/login' && this.router.url != '/user/registration';
  }
}
