using System.Collections.Generic;
using System.Threading.Tasks;
using UCarLink.Application.Dtos;
using UCarLink.Domain;

namespace UCarLink.Application.Contratos
{
    public interface IConsultaService
    {      
        Task<Intencao[]> GetConsultaIntencoesByFiltros(Consulta model); 
        Task<IList<IntencaoDetalhes>> GetConsultaIntencoesDetalhesByFiltros(Consulta model); 
    }
}