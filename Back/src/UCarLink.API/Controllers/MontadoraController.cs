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
    public class MontadoraController : ControllerBase
    {
        private readonly DataContext _context;

        public MontadoraController(DataContext context)
        {
            this._context = context;

        }

        [HttpGet]
        public IEnumerable<Montadora> Get()
        {
            return this._context.Montadoras;
        }

        [HttpGet("{id}")]
        public Montadora GetById(int id)
        {
            return this._context.Montadoras.Where(evento => evento.IdMontadora == id).FirstOrDefault();
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
