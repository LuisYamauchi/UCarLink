using System.ComponentModel.DataAnnotations;

namespace UCarLink.Domain
{
    public class TipoVeiculo
    {
        [Key]
        public int IdTipoVeiculo { get; set; }
        [Required]
        public string Descricao { get; set; }
    }
}