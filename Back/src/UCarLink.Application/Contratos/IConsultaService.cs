using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Application.Contratos
{
    public interface IConsultaService
    {      
        Task<Intencao[]> GetConsultaIntencoesByFiltros(Consulta model); 
    }
}