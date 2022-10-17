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
    public class MontadoraController : ControllerBase
    {
        private readonly IMontadoraService _montadoraService;

        public MontadoraController(IMontadoraService montadoraService)
        {
            this._montadoraService = montadoraService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var montadoras = await _montadoraService.GetAllMontadorasAsync();
                if (!montadoras.Any()) return NotFound("Nenhuma montadora encontrada.");
                return Ok(montadoras);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar Montadoras. Erro {ex.Message}");
            }
        }

        [HttpGet("{idMontadora}")]
        public async Task<IActionResult> GetById(int idMontadora)
        {
            try
            {
                var montadora = await _montadoraService.GetMontadorasByIdAsync(idMontadora);
                if (montadora == null) return NotFound("Montadora não encontrada.");
                return Ok(montadora);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar montadora. Erro {ex.Message}");
            }
        }

        [HttpGet("{descricao}/descricao")]
        public async Task<IActionResult> GetByDescricao(string descricao)
        {
            try
            {
                var montadora = await _montadoraService.GetAllMontadorasByDescricaoAsync(descricao);
                if (montadora == null) return NotFound("Montadora por descricao não encontrada.");
                return Ok(montadora);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar montadoras por descricao. Erro {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Montadora model)
        {
            try
            {
                var montadora = await _montadoraService.AddMontadora(model);
                if (montadora == null) return BadRequest("Erro ao tentar adicionar montadora.");
                return Ok(montadora);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar montadora. Erro {ex.Message}");
            }
        }

        [HttpPut("{idMontadora}")]
        public async Task<IActionResult> Put(int idMontadora, Montadora model)
        {
            try
            {
                var montadora = await _montadoraService.UpdateMontadora(idMontadora, model);
                if (montadora == null) return BadRequest("Erro ao tentar atualizar montadora.");
                return Ok(montadora);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar montadora. Erro {ex.Message}");
            }
        }

        [HttpDelete("{idMontadora}")]
        public async Task<IActionResult> Delete(int idMontadora)
        {
            try
            {
                var montadora = await _montadoraService.GetMontadorasByIdAsync(idMontadora);
                if (montadora == null) return NoContent();

                if (await _montadoraService.DeleteMontadora(idMontadora))
                    return Ok(new { message = "Deletado" });
                else
                    throw new Exception("Ocorreu um problema não específico ao tentar deletar montadora.");
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar excluir montadora. Erro {ex.Message}");
            }
        }
    }
}
