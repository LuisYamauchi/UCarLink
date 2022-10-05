using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UCarLink.API.Models
{
    public class Vendedor
    {
        public int IdVendedor { get; set; }
        public string Nome { get; set; }
        public Loja Loja { get; set; } = new Loja();
    }
}