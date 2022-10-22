using System;

namespace UCarLink.Domain
{
    public class Consulta
    {
        //0-Compra 1-Venda
        public int CompraVenda { get; set; }        
        public int IdLoja { get; set; }      
        public decimal ValorBuscaInicial { get; set; }
        public decimal ValorBuscaFinal { get; set; }   
        public DateTime? DataCadastro { get; set; }
        public DateTime? DataVencimento { get; set; }        
        public int IdModelo { get; set; }        
        public int? AnoBuscaInicial { get; set; }
        public int? AnoBuscaFim { get; set; }        
        public int IdTipoVeiculo { get; set; }        
        public int IdTipoPorta { get; set; }        
        public int IdCombustivel { get; set; }        
        public int IdCorVeiculo { get; set; }
        public string Cambio { get; set; }
        public string ArCondicionado { get; set; }
        public string VidroEletrico { get; set; }
        public string TravasEletricas { get; set; }
        public string Alarme { get; set; }
        public string Som { get; set; }
        public string DirecaoEletrica { get; set; }
        public decimal KmBuscaInicial { get; set; }
        public decimal KmBuscaFinal { get; set; }
    }
}