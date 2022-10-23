using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Application.Dtos
{
    public class IntencaoDetalhes: Intencao
    {
        public string ClienteNome { get; set; }
        public string VendedorInclusaoNome { get; set; }
        public string VendedorNegociacaoNome { get; set; }        
        public string ModeloDescricao { get; set; }        
        public string TipoVeiculoDescricao { get; set; }
        public string TipoPortaDescricao { get; set; }
        public string CombustivelDescricao { get; set; }
        public string CorVeiculoDescricao { get; set; }
    }
}