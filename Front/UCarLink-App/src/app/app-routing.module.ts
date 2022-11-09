import { IntencaoListaComponent } from './components/intencao/intencao-lista/intencao-lista.component';
import { IntencaoDetalheComponent } from './components/intencao/intencao-detalhe/intencao-detalhe.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { PerfilComponent } from './components/vendedor/perfil/perfil.component';
import { RegistrationComponent } from './components/vendedor/registration/registration.component';
import { ClienteListaComponent } from './components/clientes/cliente-lista/cliente-lista.component';
import { ClienteDetalheComponent } from './components/clientes/cliente-detalhe/cliente-detalhe.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientesComponent } from './components/clientes/clientes.component';
import { CombustivelComponent } from './components/combustivel/combustivel.component';
import { ConfiguracaoComponent } from './components/configuracao/configuracao.component';
import { CorVeiculoComponent } from './components/cor-veiculo/cor-veiculo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IntencaoComponent } from './components/intencao/intencao.component';
import { LojaComponent } from './components/loja/loja.component';
import { ModeloComponent } from './components/modelo/modelo.component';
import { MontadoraComponent } from './components/montadora/montadora.component';
import { TipoPortaComponent } from './components/tipo-porta/tipo-porta.component';
import { TipoVeiculoComponent } from './components/tipo-veiculo/tipo-veiculo.component';
import { VendedorComponent } from './components/vendedor/vendedor.component';
import { LoginComponent } from './components/vendedor/login/login.component';
import { CombustivelDetalheComponent } from './components/combustivel/combustivel-detalhe/combustivel-detalhe.component';
import { CombustivelListaComponent } from './components/combustivel/combustivel-lista/combustivel-lista.component';
import { CorVeiculoDetalheComponent } from './components/cor-veiculo/cor-veiculo-detalhe/cor-veiculo-detalhe.component';
import { CorVeiculoListaComponent } from './components/cor-veiculo/cor-veiculo-lista/cor-veiculo-lista.component';
import { LojaDetalheComponent } from './components/loja/loja-detalhe/loja-detalhe.component';
import { LojaListaComponent } from './components/loja/loja-lista/loja-lista.component';
import { ModeloDetalheComponent } from './components/modelo/modelo-detalhe/modelo-detalhe.component';
import { ModeloListaComponent } from './components/modelo/modelo-lista/modelo-lista.component';
import { MontadoraDetalheComponent } from './components/montadora/montadora-detalhe/montadora-detalhe.component';
import { MontadoraListaComponent } from './components/montadora/montadora-lista/montadora-lista.component';
import { TipoPortaDetalheComponent } from './components/tipo-porta/tipo-porta-detalhe/tipo-porta-detalhe.component';
import { TipoPortaListaComponent } from './components/tipo-porta/tipo-porta-lista/tipo-porta-lista.component';
import { TipoVeiculoDetalheComponent } from './components/tipo-veiculo/tipo-veiculo-detalhe/tipo-veiculo-detalhe.component';
import { TipoVeiculoListaComponent } from './components/tipo-veiculo/tipo-veiculo-lista/tipo-veiculo-lista.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [{
      path: 'vendedor', component: VendedorComponent,
      children: [
        { path: 'perfil', component: PerfilComponent },
      ]
    },
    {
      path: 'clientes', component: ClientesComponent,
      children: [
        { path: 'detalhe/:idCliente', component: ClienteDetalheComponent },
        { path: 'detalhe', component: ClienteDetalheComponent },
        { path: 'lista', component: ClienteListaComponent }
      ]
    },
    {
      path: 'intencao', component: IntencaoComponent,
      children: [
        { path: 'detalhe/:idIntencao', component: IntencaoDetalheComponent },
        { path: 'detalhe', component: IntencaoDetalheComponent },
        { path: 'lista', component: IntencaoListaComponent }
      ]
    },
    { path: 'combustivel', component: CombustivelComponent,
    children: [
      { path: 'detalhe/:idCombustivel', component: CombustivelDetalheComponent },
      { path: 'detalhe', component: CombustivelDetalheComponent },
      { path: 'lista', component: CombustivelListaComponent }
    ] },
    { path: 'configuracao', component: ConfiguracaoComponent },
    { path: 'corVeiculo', component: CorVeiculoComponent,
    children: [
      { path: 'detalhe/:idCorVeiculo', component: CorVeiculoDetalheComponent },
      { path: 'detalhe', component: CorVeiculoDetalheComponent },
      { path: 'lista', component: CorVeiculoListaComponent }
    ] },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'loja', component: LojaComponent ,
    children: [
      { path: 'detalhe/:idLoja', component: LojaDetalheComponent },
      { path: 'detalhe', component: LojaDetalheComponent },
      { path: 'lista', component: LojaListaComponent }
    ] },
    { path: 'modelo', component: ModeloComponent,
    children: [
      { path: 'detalhe/:idLoja', component: ModeloDetalheComponent },
      { path: 'detalhe', component: ModeloDetalheComponent },
      { path: 'lista', component: ModeloListaComponent }
    ] },
    { path: 'montadora', component: MontadoraComponent ,
    children: [
      { path: 'detalhe/:idMontadora', component: MontadoraDetalheComponent },
      { path: 'detalhe', component: MontadoraDetalheComponent },
      { path: 'lista', component: MontadoraListaComponent }
    ] },
    { path: 'tipoPorta', component: TipoPortaComponent ,
    children: [
      { path: 'detalhe/:idTipoPorta', component: TipoPortaDetalheComponent },
      { path: 'detalhe', component: TipoPortaDetalheComponent },
      { path: 'lista', component: TipoPortaListaComponent }
    ] },
    { path: 'tipoVeiculo', component: TipoVeiculoComponent ,
    children: [
      { path: 'detalhe/:idTipoVeiculo', component: TipoVeiculoDetalheComponent },
      { path: 'detalhe', component: TipoVeiculoDetalheComponent },
      { path: 'lista', component: TipoVeiculoListaComponent }
    ] },
    ]
  },
  {
    path: 'user', component: VendedorComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent }
    ]
  },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'vendedor', component: VendedorComponent },
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
