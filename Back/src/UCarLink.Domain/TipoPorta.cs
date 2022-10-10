using System.ComponentModel.DataAnnotations;

namespace UCarLink.Domain
{
    public class TipoPorta
    {
        [Key]
        public int IdTipoPorta { get; set; }
        [Required]
        public string Descricao { get; set; }  
    }
}