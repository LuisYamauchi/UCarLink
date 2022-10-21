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
    public class ConsultaController : ControllerBase
    {
        private readonly IConsultaService _consultaService;

        public ConsultaController(IConsultaService consultaService)
        {
            this._consultaService = consultaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetConsultaIntencoesByFiltros([FromQuery]Consulta model)
        {
            try
            {
                var intencoes = await _consultaService.GetConsultaIntencoesByFiltros(model);
                if (!intencoes.Any()) return NotFound("Nenhuma intenção encontrada com os filtros informados!");
                return Ok(intencoes);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar consultar intenções com os filtros informados. Erro {ex.Message}");
            }
        }


        /*  [HttpPut("{idIntencao}")]
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
          }*/
    }
}
