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
    public class IntencaoController : ControllerBase
    {
        private readonly IIntencaoService _intencaoService;

        public IntencaoController(IIntencaoService intencaoService)
        {
            this._intencaoService = intencaoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var intencoes = await _intencaoService.GetAllIntencoesAsync();
                if (!intencoes.Any()) return NotFound("Nenhuma intenção de compra ou venda encontrada.");
                return Ok(intencoes);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar intencoes. Erro {ex.Message}");
            }
        }

        [HttpGet("{idIntencao}")]
        public async Task<IActionResult> GetById(int idIntencao)
        {
            try
            {
                var intencao = await _intencaoService.GetIntencoesByIdAsync(idIntencao);
                if (intencao == null) return NotFound("Intencao não encontrada.");
                return Ok(intencao);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar intencao. Erro {ex.Message}");
            }
        }

        [HttpGet("{nomeCliente}/nomeCliente")]
        public async Task<IActionResult> GetByNomeCliente(string nomeCliente)
        {
            try
            {
                var intencoes = await _intencaoService.GetAllIntencoesByNomeAsync(nomeCliente);
                if (intencoes == null) return NotFound("Intencoes por nome desse cliente não encontrada.");
                return Ok(intencoes);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar intencoes por nome do cliente. Erro {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Intencao model)
        {
            try
            {
                var intencao = await _intencaoService.AddIntencao(model);
                if (intencao == null) return BadRequest("Erro ao tentar adicionar intencao.");
                return Ok(intencao);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar intencao. Erro {ex.Message}");
            }
        }

        [HttpPut("{idIntencao}")]
        public async Task<IActionResult> Put(int idIntencao, Intencao model)
        {
            try
            {
                var intencao = await _intencaoService.UpdateIntencao(idIntencao, model);
                if (intencao == null) return BadRequest("Erro ao tentar atualizar intencao.");
                return Ok(intencao);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar intencao. Erro {ex.Message}");
            }
        }

        [HttpDelete("{idIntencao}")]
        public async Task<IActionResult> Delete(int idIntencao)
        {
            try
            {
                var intencao = await _intencaoService.GetIntencoesByIdAsync(idIntencao);
                if (intencao == null) return NoContent();

                if (await _intencaoService.DeleteIntencao(idIntencao))
                    return Ok(new { message = "Deletado" });
                else
                    throw new Exception("Ocorreu um problema não específico ao tentar deletar intencao.");
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar excluir intencao. Erro {ex.Message}");
            }
        }
    }
}
