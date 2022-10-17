using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UCarLink.Domain
{
    public class Modelo
    {
        [Key]
        public int IdModelo { get; set; }
        [Required]
        public string Descricao { get; set; }
        [ForeignKey("Montadora")]
        public int MontadoraIdMontadora { get; set; }
    }
}