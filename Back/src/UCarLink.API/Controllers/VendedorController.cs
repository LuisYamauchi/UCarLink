using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using UCarLink.API.Data;
using UCarLink.API.Models;

namespace UCarLink.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VendedorController : ControllerBase
    {
        private readonly DataContext _context;

        public VendedorController(DataContext context)
        {
            this._context = context;

        }

        [HttpGet]
        public IEnumerable<Vendedor> Get()
        {
            return this._context.Vendedores;
        }
        
        [HttpGet("{id}")]
        public Vendedor GetById(int id)
        {
            return this._context.Vendedores.Where(evento => evento.IdVendedor == id).FirstOrDefault();
        }

        [HttpPost]
        public string Post()
        {
            return "Exemplo de Post";
        }

        [HttpPut("{id}")]
        public string Put(int id)
        {
            return $"Exemplo de Put com id = {id}";
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return $"Exemplo de Delete com id = {id}";
        }
    }
}
