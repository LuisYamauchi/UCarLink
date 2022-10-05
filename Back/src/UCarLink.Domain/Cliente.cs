using System.ComponentModel.DataAnnotations;

namespace UCarLink.Domain
{
    public class Cliente
    {
        [Key]
        public int IdCliente { get; set; }
        public string Nome { get; set; }
        public string Telefone { get; set; }
    }
}