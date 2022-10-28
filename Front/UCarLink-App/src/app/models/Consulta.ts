export interface Consulta {
  //0-Compra 1-Venda
  compraVenda: number;
  idLoja: number;
  valorBuscaInicial: number;
  valorBuscaFinal: number;
  dataCadastro: Date;
  dataVencimento: Date;
  idModelo: number;
  anoBuscaInicial: number;
  anoBuscaFim: number;
  idTipoVeiculo: number;
  idTipoPorta: number;
  idCombustivel: number;
  idCorVeiculo: number;
  cambio: string;
  arCondicionado: string;
  vidroEletrico: string;
  travasEletricas: string;
  alarme: string;
  som: string;
  direcaoEletrica: string;
  kmBuscaInicial: number;
  kmBuscaFinal: number;
}
