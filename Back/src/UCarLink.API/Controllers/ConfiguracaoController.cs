﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using UCarLink.Domain;
using UCarLink.Persistence.Contextos;
namespace UCarLink.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfiguracaoController : ControllerBase
    {
        private readonly UCarLinkContext _context;

        public ConfiguracaoController(UCarLinkContext context)
        {
            this._context = context;

        }

        [HttpGet]
        public IEnumerable<Configuracao> Get()
        {
            return this._context.Configuracoes;
        }
        
        [HttpGet("{id}")]
        public Configuracao GetById(int id)
        {
            return this._context.Configuracoes.Where(evento => evento.IdConfiguracao == id).FirstOrDefault();
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
