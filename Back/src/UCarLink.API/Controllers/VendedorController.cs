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
    public class VendedorController : ControllerBase
    {
        private readonly IVendedorService _vendedorService;

        public VendedorController(IVendedorService vendedorService)
        {
            this._vendedorService = vendedorService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var vendedores = await _vendedorService.GetAllVendedoresAsync();
                if (!vendedores.Any()) return NotFound("Nenhum vendedor encontrado.");
                return Ok(vendedores);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar vendedores. Erro {ex.Message}");
            }
        }

        [HttpGet("{idVendedor}")]
        public async Task<IActionResult> GetById(int idVendedor)
        {
            try
            {
                var vendedor = await _vendedorService.GetVendedoresByIdAsync(idVendedor);
                if (vendedor == null) return NotFound("Vendedor não encontrado.");
                return Ok(vendedor);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar vendedor. Erro {ex.Message}");
            }
        }

        [HttpGet("{nome}/nome")]
        public async Task<IActionResult> GetByNome(string nome)
        {
            try
            {
                var vendedores = await _vendedorService.GetAllVendedoresByNomeAsync(nome);
                if (vendedores == null) return NotFound("Vendedores por nome não encontrado.");
                return Ok(vendedores);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar vendedores por nome. Erro {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Vendedor model)
        {
            try
            {
                var vendedor = await _vendedorService.AddVendedor(model);
                if (vendedor == null) return BadRequest("Erro ao tentar adicionar vendedor.");
                return Ok(vendedor);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar vendedor. Erro {ex.Message}");
            }
        }

        [HttpPut("{idVendedor}")]
        public async Task<IActionResult> Put(int idVendedor, Vendedor model)
        {
            try
            {
                var vendedor = await _vendedorService.UpdateVendedor(idVendedor, model);
                if (vendedor == null) return BadRequest("Erro ao tentar atualizar vendedor.");
                return Ok(vendedor);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar vendedor. Erro {ex.Message}");
            }
        }

        [HttpDelete("{idVendedor}")]
        public async Task<IActionResult> Delete(int idVendedor)
        {
            try
            {
                var vendedor = await _vendedorService.GetVendedoresByIdAsync(idVendedor);
                if (vendedor == null) return NoContent();

                if (await _vendedorService.DeleteVendedor(idVendedor))
                    return Ok(new { message = "Deletado" });
                else
                    throw new Exception("Ocorreu um problem não específico ao tentar deletar vendedor.");
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar excluir vendedor. Erro {ex.Message}");
            }
        }
    }
}
