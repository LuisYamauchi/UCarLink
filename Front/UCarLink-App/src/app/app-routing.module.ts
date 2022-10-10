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
  { path: 'clientes', component: ClientesComponent },
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
  // { path: 'vendedor', component: VendedorComponent },
  { path: 'vendedor', component: VendedorComponent },
  { path: '', redirectTo:'dashboard', pathMatch:'full' },
  { path: '**', redirectTo:'dashboard', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
