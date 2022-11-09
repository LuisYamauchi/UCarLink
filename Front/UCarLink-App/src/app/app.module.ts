import { LojaService } from './services/loja.service';
import { IntencaoService } from './services/intencao.service';
import { HomeComponent } from './components/home/home.component';
import { VendedorService } from './services/vendedor.service';
import { RegistrationComponent } from './components/vendedor/registration/registration.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavComponent } from './shared/nav/nav.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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

import { ClienteService } from './services/cliente.service';
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { TituloComponent } from './shared/titulo/titulo.component';
import { ClienteDetalheComponent } from './components/clientes/cliente-detalhe/cliente-detalhe.component';
import { ClienteListaComponent } from './components/clientes/cliente-lista/cliente-lista.component';
import { PerfilComponent } from './components/vendedor/perfil/perfil.component';
import { IntencaoDetalheComponent } from './components/intencao/intencao-detalhe/intencao-detalhe.component';
import { IntencaoListaComponent } from './components/intencao/intencao-lista/intencao-lista.component';
import { ModeloService } from './services/modelo.service';
import { TipoVeiculoService } from './services/tipo-veiculo.service';
import { TipoPortaService } from './services/tipo-porta.service';
import { CombustivelService } from './services/combustivel.service';
import { CorVeiculoService } from './services/cor-veiculo.service';
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
import { MontadoraService } from './services/montadora.service';
import { TipoPortaDetalheComponent } from './components/tipo-porta/tipo-porta-detalhe/tipo-porta-detalhe.component';
import { TipoPortaListaComponent } from './components/tipo-porta/tipo-porta-lista/tipo-porta-lista.component';
import { TipoVeiculoListaComponent } from './components/tipo-veiculo/tipo-veiculo-lista/tipo-veiculo-lista.component';
import { TipoVeiculoDetalheComponent } from './components/tipo-veiculo/tipo-veiculo-detalhe/tipo-veiculo-detalhe.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ClienteDetalheComponent,
    ClienteListaComponent,
    CombustivelComponent,
    CombustivelDetalheComponent,
    CombustivelListaComponent,
    ConfiguracaoComponent,
    CorVeiculoComponent,
    CorVeiculoDetalheComponent,
    CorVeiculoListaComponent,
    DashboardComponent,
    IntencaoComponent,
    LojaComponent,
    ModeloComponent,
    ModeloDetalheComponent,
    ModeloListaComponent,
    MontadoraComponent,
    MontadoraDetalheComponent,
    MontadoraListaComponent,
    TipoPortaComponent,
    TipoVeiculoComponent,
    VendedorComponent,
    NavComponent,
    DateTimeFormatPipe,
    TituloComponent,
    CombustivelComponent,
    ConfiguracaoComponent,
    CorVeiculoComponent,
    IntencaoComponent,
    LojaComponent,
    LojaDetalheComponent,
    LojaListaComponent,
    ModeloComponent,
    MontadoraComponent,
    TipoPortaComponent,
    TipoPortaDetalheComponent,
    TipoPortaListaComponent,
    TipoVeiculoComponent,
    TipoVeiculoDetalheComponent,
    TipoVeiculoListaComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    PerfilComponent,
    IntencaoDetalheComponent,
    IntencaoListaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    NgxSpinnerModule
  ],
  providers: [
    ClienteService,
    VendedorService,
    IntencaoService,
    LojaService,
    ModeloService,
    MontadoraService,
    TipoVeiculoService,
    TipoPortaService,
    CombustivelService,
    CorVeiculoService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
