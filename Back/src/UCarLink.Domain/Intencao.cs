using System;

namespace UCarLink.Domain
{
    public class Intencao
    {
        public int IdIntencao { get; set; }
        public Cliente Cliente { get; set; } = new Cliente();
        public int CompraVenda { get; set; }
        public Vendedor VendedorInclusao { get; set; } = new Vendedor();
        public Vendedor VendedorNegociacao { get; set; } = new Vendedor();
        public decimal ValorInicial { get; set; }
        public decimal ValorFinal { get; set; }
        public decimal ValorVeiculo { get; set; }
        public DateTime DataCadastro { get; set; } = DateTime.Now;
        public DateTime? DataVencimento { get; set; }
        public Modelo Modelo { get; set; } = new Modelo();
        public int? AnoInicial { get; set; }
        public int? AnoFinal { get; set; }
        public TipoVeiculo TipoVeiculo { get; set; } = new TipoVeiculo();
        public TipoPorta TipoPorta { get; set; } = new TipoPorta();
        public Combustivel Combustivel { get; set; } = new Combustivel();
        public CorVeiculo CorVeiculo { get; set; } = new CorVeiculo();
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