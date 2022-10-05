namespace UCarLink.Domain
{
    public class Configuracao
    {
        public int IdConfiguracao { get; set; }
        public int QtdeDiasValidadePadrao { get; set; }
        public decimal ValorMinBusca { get; set; }
        public string ValorMaxBusca { get; set; }
        public decimal PorcentagemComissao { get; set; }        
    }
}