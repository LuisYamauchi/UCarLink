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
    public class ModeloController : ControllerBase
    {
        private readonly IModeloService _modeloService;

        public ModeloController(IModeloService modeloService)
        {
            this._modeloService = modeloService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var modelos = await _modeloService.GetAllModelosAsync();
                if (!modelos.Any()) return NotFound("Nenhum modelo encontrado.");
                return Ok(modelos);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar modelos. Erro {ex.Message}");
            }
        }

        [HttpGet("{idModelo}")]
        public async Task<IActionResult> GetById(int idModelo)
        {
            try
            {
                var modelo = await _modeloService.GetModelosByIdAsync(idModelo);
                if (modelo == null) return NotFound("Modelo não encontrado.");
                return Ok(modelo);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar modelo. Erro {ex.Message}");
            }
        }

        [HttpGet("{descricao}/descricao")]
        public async Task<IActionResult> GetByDescricao(string descricao)
        {
            try
            {
                var modelo = await _modeloService.GetAllModelosByDescricaoAsync(descricao);
                if (modelo == null) return NotFound("Modelo por descricao não encontrado.");
                return Ok(modelo);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar modelos por descricao. Erro {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Modelo model)
        {
            try
            {
                var modelo = await _modeloService.AddModelo(model);
                if (modelo == null) return BadRequest("Erro ao tentar adicionar modelo.");
                return Ok(modelo);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar modelo. Erro {ex.Message}");
            }
        }

        [HttpPut("{idModelo}")]
        public async Task<IActionResult> Put(int idModelo, Modelo model)
        {
            try
            {
                var modelo = await _modeloService.UpdateModelo(idModelo, model);
                if (modelo == null) return BadRequest("Erro ao tentar atualizar modelo.");
                return Ok(modelo);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar modelo. Erro {ex.Message}");
            }
        }

        [HttpDelete("{idModelo}")]
        public async Task<IActionResult> Delete(int idModelo)
        {
            try
            {
                var modelo = await _modeloService.GetModelosByIdAsync(idModelo);
                if (modelo == null) return NoContent();

                if (await _modeloService.DeleteModelo(idModelo))
                    return Ok(new { message = "Deletado" });
                else
                    throw new Exception("Ocorreu um problema não específico ao tentar deletar modelo.");
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar excluir modelo. Erro {ex.Message}");
            }
        }
    }
}
