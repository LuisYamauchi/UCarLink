using System.ComponentModel.DataAnnotations;

namespace UCarLink.Domain
{
    public class Montadora
    {
        [Key]
        public int IdMontadora { get; set; }
        public string Descricao { get; set; }   
    }
}