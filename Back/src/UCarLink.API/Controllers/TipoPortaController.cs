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
    public class TipoPortaController : ControllerBase
    {
        private readonly ITipoPortaService _tipoPortaService;

        public TipoPortaController(ITipoPortaService tipoPortaService)
        {
            this._tipoPortaService = tipoPortaService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var tiposPorta = await _tipoPortaService.GetAllTiposPortaAsync();
                if (!tiposPorta.Any()) return NotFound("Nenhum tipo de Porta encontrado.");
                return Ok(tiposPorta);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar tipos de porta. Erro {ex.Message}");
            }
        }

        [HttpGet("{idTipoPorta}")]
        public async Task<IActionResult> GetById(int idTipoPorta)
        {
            try
            {
                var tipoPorta = await _tipoPortaService.GetTiposPortaByIdAsync(idTipoPorta);
                if (tipoPorta == null) return NotFound("Tipo de Porta não encontrado.");
                return Ok(tipoPorta);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar tipo de porta. Erro {ex.Message}");
            }
        }

        [HttpGet("{descricao}/descricao")]
        public async Task<IActionResult> GetByDescricao(string descricao)
        {
            try
            {
                var tiposPorta = await _tipoPortaService.GetAllTiposPortaByDescricaoAsync(descricao);
                if (tiposPorta == null) return NotFound("Tipos de Porta por descricao não encontrado.");
                return Ok(tiposPorta);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar tipos de porta por descricao. Erro {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(TipoPorta model)
        {
            try
            {
                var tipoPorta = await _tipoPortaService.AddTipoPorta(model);
                if (tipoPorta == null) return BadRequest("Erro ao tentar adicionar tipo de porta.");
                return Ok(tipoPorta);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar tipo de porta. Erro {ex.Message}");
            }
        }

        [HttpPut("{idTipoPorta}")]
        public async Task<IActionResult> Put(int idTipoPorta, TipoPorta model)
        {
            try
            {
                var tipoPorta = await _tipoPortaService.UpdateTipoPorta(idTipoPorta, model);
                if (tipoPorta == null) return BadRequest("Erro ao tentar atualizar tipo de porta.");
                return Ok(tipoPorta);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar tipo de Porta. Erro {ex.Message}");
            }
        }

        [HttpDelete("{idTipoPorta}")]
        public async Task<IActionResult> Delete(int idTipoPorta)
        {
            try
            {
                var tipoPorta = await _tipoPortaService.GetTiposPortaByIdAsync(idTipoPorta);
                if (tipoPorta == null) return NoContent();

                if (await _tipoPortaService.DeleteTipoPorta(idTipoPorta))
                    return Ok(new { message = "Deletado" });
                else
                    throw new Exception("Ocorreu um problem não específico ao tentar deletar tipo de porta.");
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar excluir tipo de porta. Erro {ex.Message}");
            }
        }
    }
}
