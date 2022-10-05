using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UCarLink.API.Models
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