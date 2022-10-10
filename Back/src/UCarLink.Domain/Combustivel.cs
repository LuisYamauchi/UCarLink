using System.ComponentModel.DataAnnotations;

namespace UCarLink.Domain
{
    public class Combustivel
    {
        [Key]
        public int IdCombustivel { get; set; }
        [Required]
        public string Descricao { get; set; }
    }
}