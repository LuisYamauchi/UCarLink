using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Persistence.Contratos
{
    public interface IIntencaoPersist
    {
        Task<Intencao[]> GetAllIntencoesByNomeAsync(string nome);
        Task<Intencao[]> GetAllIntencoesAsync();
        Task<Intencao> GetIntencoesByIdAsync(int IdIntencao);

    }
}