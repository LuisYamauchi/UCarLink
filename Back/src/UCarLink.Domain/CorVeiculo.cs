using System.ComponentModel.DataAnnotations;

namespace UCarLink.Domain
{
    public class CorVeiculo
    {
        [Key]
        public int IdCorVeiculo { get; set; }
        [Required]
        public string Descricao { get; set; }
    }
}