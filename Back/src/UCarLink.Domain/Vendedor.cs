using System.ComponentModel.DataAnnotations;

namespace UCarLink.Domain
{
    public class Vendedor
    {
        [Key]
        public int IdVendedor { get; set; }
        public string Nome { get; set; }
        public Loja Loja { get; set; } = new Loja();
    }
}