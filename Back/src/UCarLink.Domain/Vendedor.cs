using System.ComponentModel.DataAnnotations;

namespace UCarLink.Domain
{
    public class Vendedor
    {
        [Key]
        public int IdVendedor { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Usuario { get; set; }
        [Required]
        public Loja Loja { get; set; } = new Loja();
    }
}