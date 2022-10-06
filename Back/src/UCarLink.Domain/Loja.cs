using System.ComponentModel.DataAnnotations;

namespace UCarLink.Domain
{
    public class Loja
    {
        [Key]
        public int IdLoja { get; set; }
        public string Nome { get; set; }
        public string CNPJ { get; set; }
    }
}