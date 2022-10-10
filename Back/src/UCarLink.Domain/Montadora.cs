using System.ComponentModel.DataAnnotations;

namespace UCarLink.Domain
{
    public class Montadora
    {
        [Key]
        public int IdMontadora { get; set; }
        [Required]
        public string Descricao { get; set; }   
    }
}