using System.ComponentModel.DataAnnotations;

namespace UCarLink.Domain
{
    public class CorVeiculo
    {
        [Key]
        public int IdCorVeiculo { get; set; }
        public string Descricao { get; set; }
    }
}