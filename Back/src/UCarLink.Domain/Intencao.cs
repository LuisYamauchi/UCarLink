using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UCarLink.Domain
{
    public class Intencao
    {
        [Key]
        public int IdIntencao { get; set; }
        [ForeignKey("Cliente")]
        public int ClienteIdCliente { get; set; }
        //0-Compra 1-Venda
        public int CompraVenda { get; set; }
        [ForeignKey("Vendedor")]
        public int VendedorInclusaoIdVendedor { get; set; }
        [ForeignKey("Vendedor")]
        public int VendedorNegociacaoIdVendedor { get; set; }        
        public decimal ValorInicial { get; set; }
        public decimal ValorFinal { get; set; }
        public decimal ValorVeiculo { get; set; }
        public DateTime? DataCadastro { get; set; }
        public DateTime? DataVencimento { get; set; }
        [ForeignKey("Modelo")]
        public int ModeloIdModelo { get; set; }        
        public int? AnoInicial { get; set; }        
        [ForeignKey("TipoVeiculo")]
        public int TipoVeiculoIdTipoVeiculo { get; set; }
        [ForeignKey("TipoPorta")]
        public int TipoPortaIdTipoPorta { get; set; }
        [ForeignKey("Combustivel")]
        public int CombustivelIdCombustivel { get; set; }
        [ForeignKey("CorVeiculo")]
        public int CorVeiculoIdCorVeiculo { get; set; }
        public string Cambio { get; set; }
        public string ArCondicionado { get; set; }
        public string VidroEletrico { get; set; }
        public string TravasEletricas { get; set; }
        public string Alarme { get; set; }
        public string Som { get; set; }
        public string DirecaoEletrica { get; set; }
        public decimal KmInicial { get; set; }
        public decimal KmFinal { get; set; }
    }
}