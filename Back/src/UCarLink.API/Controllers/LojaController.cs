using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using UCarLink.Domain;
using UCarLink.Persistence.Contextos;

namespace UCarLink.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LojaController : ControllerBase
    {
        private readonly UCarLinkContext _context;

        public LojaController(UCarLinkContext context)
        {
            this._context = context;

        }

        [HttpGet]
        public IEnumerable<Loja> Get()
        {
            return this._context.Lojas;
        }
        
        [HttpGet("{id}")]
        public Loja GetById(int id)
        {
            return this._context.Lojas.Where(evento => evento.IdLoja == id).FirstOrDefault();
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
