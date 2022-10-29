using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UCarLink.Application.Contratos;
using UCarLink.Domain;

namespace UCarLink.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfiguracaoController : ControllerBase
    {
        private readonly IConfiguracaoService _configuracaoService;

        public ConfiguracaoController(IConfiguracaoService configuracaoService)
        {
            this._configuracaoService = configuracaoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var configuracoes = await _configuracaoService.GetAllConfiguracoesAsync();
                if (configuracoes == null) return NotFound("Nenhum configuracao encontrado.");
                return Ok(configuracoes);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar configuracoes. Erro {ex.Message}");
            }
        }   

        [HttpPost]
        public async Task<IActionResult> Post(Configuracao model)
        {
            try
            {
                var configuracao = await _configuracaoService.AddConfiguracao(model);
                if (configuracao == null) return BadRequest("Erro ao tentar adicionar configuracao.");
                return Ok(configuracao);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar configuracao. Erro {ex.Message}");
            }
        }

        [HttpPut("{idConfiguracao}")]
        public async Task<IActionResult> Put(int idConfiguracao, Configuracao model)
        {
            try
            {
                var configuracao = await _configuracaoService.UpdateConfiguracao(idConfiguracao, model);
                if (configuracao == null) return BadRequest("Erro ao tentar atualizar configuracao.");
                return Ok(configuracao);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar configuracao. Erro {ex.Message}");
            }
        }     
    }
}
