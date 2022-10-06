using System.ComponentModel.DataAnnotations;

namespace UCarLink.Domain
{
    public class TipoVeiculo
    {
        [Key]
        public int IdTipoVeiculo { get; set; }
        public string Descricao { get; set; }
    }
}