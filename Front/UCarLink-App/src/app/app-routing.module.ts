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
    // { path: 'clientes', redirectTo: 'clientes/lista' },
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
    { path: 'combustivel', component: CombustivelComponent },
    { path: 'configuracao', component: ConfiguracaoComponent },
    { path: 'corVeiculo', component: CorVeiculoComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'intencao', component: IntencaoComponent },
    { path: 'loja', component: LojaComponent },
    { path: 'modelo', component: ModeloComponent },
    { path: 'montadora', component: MontadoraComponent },
    { path: 'tipoPorta', component: TipoPortaComponent },
    { path: 'tipoVeiculo', component: TipoVeiculoComponent },
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
