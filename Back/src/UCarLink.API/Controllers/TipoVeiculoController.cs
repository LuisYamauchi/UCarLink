using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UCarLink.Application;
using UCarLink.Application.Contratos;
using UCarLink.Domain;

namespace UCarLink.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TipoVeiculoController : ControllerBase
    {
        private readonly ITipoVeiculoService _tipoVeiculoService;

        public TipoVeiculoController(ITipoVeiculoService tipoVeiculoService)
        {
            this._tipoVeiculoService = tipoVeiculoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var tiposVeiculoService = await _tipoVeiculoService.GetAllTiposVeiculoAsync();
                if (!tiposVeiculoService.Any()) return NotFound("Nenhum tipo de veiculo encontrado.");
                return Ok(tiposVeiculoService);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar tipo de veiculo. Erro {ex.Message}");
            }
        }

        [HttpGet("{idTipoVeiculo}")]
        public async Task<IActionResult> GetById(int idTipoVeiculo)
        {
            try
            {
                var tipoVeiculo = await _tipoVeiculoService.GetTiposVeiculoByIdAsync(idTipoVeiculo);
                if (tipoVeiculo == null) return NotFound("Tipo de Veiculo não encontrado.");
                return Ok(tipoVeiculo);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar tipos de Veiculo. Erro {ex.Message}");
            }
        }

        [HttpGet("{descricao}/descricao")]
        public async Task<IActionResult> GetByDescricao(string descricao)
        {
            try
            {
                var tipoVeiculo = await _tipoVeiculoService.GetAllTiposVeiculoByDescricaoAsync(descricao);
                if (tipoVeiculo == null) return NotFound("Tipo de Veiculo por descricao não encontrado.");
                return Ok(tipoVeiculo);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar tipos de veiculo por descricao. Erro {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(TipoVeiculo model)
        {
            try
            {
                var tipoVeiculo = await _tipoVeiculoService.AddTipoVeiculo(model);
                if (tipoVeiculo == null) return BadRequest("Erro ao tentar adicionar tipos de veiculo.");
                return Ok(tipoVeiculo);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar tipo de veiculo. Erro {ex.Message}");
            }
        }

        [HttpPut("{idTipoVeiculo}")]
        public async Task<IActionResult> Put(int idTipoVeiculo, TipoVeiculo model)
        {
            try
            {
                var tipoVeiculo = await _tipoVeiculoService.UpdateTipoVeiculo(idTipoVeiculo, model);
                if (tipoVeiculo == null) return BadRequest("Erro ao tentar atualizar tipo de veiculo.");
                return Ok(tipoVeiculo);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar tipo de veiculo. Erro {ex.Message}");
            }
        }

        [HttpDelete("{idTipoVeiculo}")]
        public async Task<IActionResult> Delete(int idTipoVeiculo)
        {
            try
            {
                var tipoVeiculo = await _tipoVeiculoService.GetTiposVeiculoByIdAsync(idTipoVeiculo);
                if (tipoVeiculo == null) return NoContent();

                if (await _tipoVeiculoService.DeleteTipoVeiculo(idTipoVeiculo))
                    return Ok(new { message = "Deletado" });
                else
                    throw new Exception("Ocorreu um problema não específico ao tentar deletar tipo de veiculo.");
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar excluir tipo de veiculo. Erro {ex.Message}");
            }
        }
    }
}
