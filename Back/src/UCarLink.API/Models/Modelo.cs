using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UCarLink.API.Models
{
    public class Modelo
    {
        public int IdModelo { get; set; }
        public int Descricao { get; set; }
        public Montadora Montadora { get; set; } = new Montadora();
    }
}