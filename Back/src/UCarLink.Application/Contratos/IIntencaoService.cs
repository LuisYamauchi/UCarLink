using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Application.Contratos
{
    public interface IIntencaoService
    {
        Task<Intencao> AddIntencao(Intencao model);
        Task<Intencao> UpdateIntencao(int idIntencao, Intencao model);
        Task<bool> DeleteIntencao(int idIntencao);
        Task<Intencao[]> GetAllIntencoesAsync();
        Task<Intencao[]> GetAllIntencoesByNomeAsync(string nome);
        Task<Intencao> GetIntencoesByIdAsync(int idVendedor);
    }
}