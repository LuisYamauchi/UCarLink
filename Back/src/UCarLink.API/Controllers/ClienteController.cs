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
    public class ClienteController : ControllerBase
    {
        private readonly IClienteService _clienteService;

        public ClienteController(IClienteService clienteService)
        {
            this._clienteService = clienteService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var clientes = await _clienteService.GetAllClientesAsync();
                if (clientes == null) return NotFound("Nenhum cliente encontrado.");
                return Ok(clientes);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar clientes. Erro {ex.Message}");
            }
        }

        [HttpGet("{idCliente}")]
        public async Task<IActionResult> GetById(int idCliente)
        {
            try
            {
                var cliente = await _clienteService.GetClientesByIdAsync(idCliente);
                if (cliente == null) return NotFound("Cliente não encontrado.");
                return Ok(cliente);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar cliente. Erro {ex.Message}");
            }
        }

        [HttpGet("{nome}/nome")]
        public async Task<IActionResult> GetByNome(string nome)
        {
            try
            {
                var clientes = await _clienteService.GetAllClientesByNomeAsync(nome);
                if (clientes == null) return NotFound("Clientes por nome não encontrado.");
                return Ok(clientes);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuparar clientes por nome. Erro {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Cliente model)
        {
            try
            {
                var cliente = await _clienteService.AddCliente(model);
                if (cliente == null) return BadRequest("Erro ao tentar adicionar cliente.");
                return Ok(cliente);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar adicionar cliente. Erro {ex.Message}");
            }
        }

        [HttpPut("{idCliente}")]
        public async Task<IActionResult> Put(int idCliente, Cliente model)
        {
            try
            {
                var cliente = await _clienteService.UpdateCliente(idCliente, model);
                if (cliente == null) return BadRequest("Erro ao tentar atualizar cliente.");
                return Ok(cliente);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar atualizar cliente. Erro {ex.Message}");
            }
        }

        [HttpDelete("{idCliente}")]
        public async Task<IActionResult> Delete(int idCliente)
        {
            try
            {
                var cliente = await _clienteService.GetClientesByIdAsync(idCliente);
                if (cliente == null) return NoContent();

                if (await _clienteService.DeleteCliente(idCliente))
                    return Ok(new { message = "Deletado" });
                else
                    throw new Exception("Ocorreu um problem não específico ao tentar deletar cliente.");
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar excluir cliente. Erro {ex.Message}");
            }
        }
    }
}
