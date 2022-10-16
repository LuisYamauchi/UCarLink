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
    public class CombustivelController : ControllerBase
    {
        private readonly ICombustivelService _combustivelService;

        public CombustivelController(ICombustivelService combustivelService)
        {
            this._combustivelService = combustivelService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var combustiveis = await _combustivelService.GetAllCombustiveisAsync();
                if (!combustiveis.Any()) return NotFound("Nenhum Combustivel encontrado.");
                return Ok(combustiveis);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar Combustiveis. Erro {ex.Message}");
            }
        }

        [HttpGet("{idCombustivel}")]
        public async Task<IActionResult> GetById(int idCombustivel)
        {
            try
            {
                var combustivel = await _combustivelService.GetCombustiveisByIdAsync(idCombustivel);
                if (combustivel == null) return NotFound("Combustivel não encontrado.");
                return Ok(combustivel);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar combustivel. Erro {ex.Message}");
            }
        }

        [HttpGet("{descricao}/descricao")]
        public async Task<IActionResult> GetByDescricao(string descricao)
        {
            try
            {
                var combustiveis = await _combustivelService.GetAllCombustiveisByDescricaoAsync(descricao);
                if (combustiveis == null) return NotFound("Combustiveis por descricao não encontrado.");
                return Ok(combustiveis);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar combustiveis por descricao. Erro {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Combustivel model)
        {
            try
            {
                var combustivel = await _combustivelService.AddCombustivel(model);
                if (combustivel == null) return BadRequest("Erro ao tentar adicionar combustivel.");
                return Ok(combustivel);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar combustivel. Erro {ex.Message}");
            }
        }

        [HttpPut("{idCombustivel}")]
        public async Task<IActionResult> Put(int idCombustivel, Combustivel model)
        {
            try
            {
                var combustivel = await _combustivelService.UpdateCombustivel(idCombustivel, model);
                if (combustivel == null) return BadRequest("Erro ao tentar atualizar combustivel.");
                return Ok(combustivel);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar combustivel. Erro {ex.Message}");
            }
        }

        [HttpDelete("{idCombustivel}")]
        public async Task<IActionResult> Delete(int idCombustivel)
        {
            try
            {
                var combustivel = await _combustivelService.GetCombustiveisByIdAsync(idCombustivel);
                if (combustivel == null) return NoContent();

                if (await _combustivelService.DeleteCombustivel(idCombustivel))
                    return Ok(new { message = "Deletado" });
                else
                    throw new Exception("Ocorreu um problem não específico ao tentar deletar combustivel.");
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar excluir combustivel. Erro {ex.Message}");
            }
        }
    }
}
