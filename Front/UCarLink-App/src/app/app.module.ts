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

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    CombustivelComponent,
    ConfiguracaoComponent,
    CorVeiculoComponent,
    DashboardComponent,
    IntencaoComponent,
    LojaComponent,
    ModeloComponent,
    MontadoraComponent,
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
    ModeloComponent,
    MontadoraComponent,
    TipoPortaComponent,
    TipoVeiculoComponent,
    LoginComponent
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
  providers: [ClienteService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
