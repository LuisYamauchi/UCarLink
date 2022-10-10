using System.ComponentModel.DataAnnotations;

namespace UCarLink.Domain
{
    public class Cliente
    {
        [Key]
        public int IdCliente { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Telefone { get; set; }
    }
}