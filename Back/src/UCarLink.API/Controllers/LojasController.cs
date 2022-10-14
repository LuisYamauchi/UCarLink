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
    public class LojasController : ControllerBase
    {
        private readonly ILojaService _lojaService;

        public LojasController(ILojaService lojaService)
        {
            this._lojaService = lojaService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var lojas = await _lojaService.GetAllLojasAsync();
                if (!lojas.Any()) return NotFound("Nenhuma loja encontrada.");
                return Ok(lojas);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar lojas. Erro {ex.Message}");
            }
        }

        [HttpGet("{idLoja}")]
        public async Task<IActionResult> GetById(int idLoja)
        {
            try
            {
                var loja = await _lojaService.GetLojasByIdAsync(idLoja);
                if (loja == null) return NotFound("Loja não encontrada.");
                return Ok(loja);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar loja. Erro {ex.Message}");
            }
        }

        [HttpGet("{nome}/nome")]
        public async Task<IActionResult> GetByNome(string nome)
        {
            try
            {
                var lojas = await _lojaService.GetAllLojasByNomeAsync(nome);
                if (lojas == null) return NotFound("Lojas por nome não encontrada.");
                return Ok(lojas);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar lojas por nome. Erro {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Loja model)
        {
            try
            {
                var loja = await _lojaService.AddLoja(model);
                if (loja == null) return BadRequest("Erro ao tentar adicionar loja.");
                return Ok(loja);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar loja. Erro {ex.Message}");
            }
        }

        [HttpPut("{idLoja}")]
        public async Task<IActionResult> Put(int idLoja, Loja model)
        {
            try
            {
                var loja = await _lojaService.UpdateLoja(idLoja, model);
                if (loja == null) return BadRequest("Erro ao tentar atualizar loja.");
                return Ok(loja);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar loja. Erro {ex.Message}");
            }
        }

        [HttpDelete("{idLoja}")]
        public async Task<IActionResult> Delete(int idLoja)
        {
            try
            {
                return await _lojaService.DeleteLoja(idLoja) ? Ok("Loja deletada com sucesso!") : BadRequest("Loja não deletada.");
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar excluir loja. Erro {ex.Message}");
            }
        }
    }
}
