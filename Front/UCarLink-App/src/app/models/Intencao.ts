export interface Intencao {
  idIntencao: number;
  clienteIdCliente: number;
  compraVenda: number;
  vendedorInclusaoIdVendedor: number;
  vendedorNegociacaoIdVendedor: number;
  valorInicial: number;
  valorFinal: number;
  valorVeiculo: number;
  dataCadastro: Date;
  dataVencimento?: Date;
  modeloIdModelo: number;
  anoInicial?: number;
  anoFinal?: number;
  tipoVeiculoIdTipoVeiculo: number;
  tipoPortaIdTipoPorta: number;
  combustivelIdCombustivel: number;
  corVeiculoIdCorVeiculo: number;
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
export interface TipoIntencao {
  id: number;
  descricao: string;
}
export interface TipoCambio {
  id: string;
  descricao: string;
}

export interface IntencaoDetalhes extends Intencao
{
    clienteNome: string;
    vendedorInclusaoNome: string;
    vendedorNegociacaoNome: string;
    modeloDescricao: string;
    tipoVeiculoDescricao: string;
    tipoPortaDescricao: string;
    combustivelDescricao: string;
    corVeiculoDescricao: string;
}
