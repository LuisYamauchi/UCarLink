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
    public class CorVeiculoController : ControllerBase
    {
        private readonly ICorVeiculoService _corVeiculoService;

        public CorVeiculoController(ICorVeiculoService corVeiculoService)
        {
            this._corVeiculoService = corVeiculoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var coresVeiculo = await _corVeiculoService.GetAllCoresVeiculoAsync();
                if (!coresVeiculo.Any()) return NotFound("Nenhuma cor de Veiculo encontrada.");
                return Ok(coresVeiculo);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar Cores de Veiculo. Erro {ex.Message}");
            }
        }

        [HttpGet("{idCorVeiculo}")]
        public async Task<IActionResult> GetById(int idCorVeiculo)
        {
            try
            {
                var corVeiculo = await _corVeiculoService.GetCoresVeiculoByIdAsync(idCorVeiculo);
                if (corVeiculo == null) return NotFound("Cor de Veiculo não encontrada.");
                return Ok(corVeiculo);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar cor de veiculo. Erro {ex.Message}");
            }
        }

        [HttpGet("{descricao}/descricao")]
        public async Task<IActionResult> GetByDescricao(string descricao)
        {
            try
            {
                var coresVeiculo = await _corVeiculoService.GetAllCoresVeiculoByDescricaoAsync(descricao);
                if (coresVeiculo == null) return NotFound("Cor de veiculo por descricao não encontrada.");
                return Ok(coresVeiculo);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar cores de veiculo por descricao. Erro {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(CorVeiculo model)
        {
            try
            {
                var corVeiculo = await _corVeiculoService.AddCorVeiculo(model);
                if (corVeiculo == null) return BadRequest("Erro ao tentar adicionar cor de veiculo.");
                return Ok(corVeiculo);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar cor de veiculo. Erro {ex.Message}");
            }
        }

        [HttpPut("{idCorVeiculo}")]
        public async Task<IActionResult> Put(int idCorVeiculo, CorVeiculo model)
        {
            try
            {
                var corVeiculo = await _corVeiculoService.UpdateCorVeiculo(idCorVeiculo, model);
                if (corVeiculo == null) return BadRequest("Erro ao tentar atualizar cor.");
                return Ok(corVeiculo);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar cor. Erro {ex.Message}");
            }
        }

        [HttpDelete("{idCorVeiculo}")]
        public async Task<IActionResult> Delete(int idCorVeiculo)
        {
            try
            {
                var corVeiculo = await _corVeiculoService.GetCoresVeiculoByIdAsync(idCorVeiculo);
                if (corVeiculo == null) return NoContent();

                if (await _corVeiculoService.DeleteCorVeiculo(idCorVeiculo))
                    return Ok(new { message = "Deletado" });
                else
                    throw new Exception("Ocorreu um problema não específico ao tentar deletar cor.");
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar excluir cor. Erro {ex.Message}");
            }
        }
    }
}
