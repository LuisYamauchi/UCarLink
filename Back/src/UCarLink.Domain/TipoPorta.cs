using System.ComponentModel.DataAnnotations;

namespace UCarLink.Domain
{
    public class TipoPorta
    {
        [Key]
        public int IdTipoPorta { get; set; }
        public string Descricao { get; set; }  
    }
}