using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Persistence.Contratos
{
    public interface IConsultaPersist
    {
        Task<Intencao[]> GetConsultaIntencoesByFiltros(Consulta model);
    }
}