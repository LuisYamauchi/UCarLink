using System.ComponentModel.DataAnnotations;

namespace UCarLink.Domain
{
    public class Modelo
    {
        [Key]
        public int IdModelo { get; set; }
        [Required]
        public int Descricao { get; set; }
        public Montadora Montadora { get; set; } = new Montadora();
    }
}