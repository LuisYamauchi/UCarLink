import { Cliente } from "./Cliente";
import { Combustivel } from "./Combustivel";
import { CorVeiculo } from "./CorVeiculo";
import { Modelo } from "./Modelo";
import { TipoPorta } from "./TipoPorta";
import { TipoVeiculo } from "./TipoVeiculo";
import { Vendedor } from "./Vendedor";

export interface Intencao {
  idIntencao: number;
  cliente: Cliente;
  compraVenda: number;
  vendedorInclusao: Vendedor;
  vendedorNegociacao: Vendedor;
  valorInicial: number;
  valorFinal: number;
  valorVeiculo: number;
  dataCadastro: Date;
  dataVencimento?: Date;
  modelo: Modelo;
  anoInicial?: number;
  anoFinal?: number;
  tipoVeiculo: TipoVeiculo;
  tipoPorta: TipoPorta;
  combustivel: Combustivel;
  corVeiculo: CorVeiculo;
  cambio: string;
  arCondicionado: string;
  vidroEletrico: string;
  travasEletricas: string;
  alarme: string;
  som: string;
  direcaoEletrica: string;
  kmInicial: number;
  kmFinal: number;
}
