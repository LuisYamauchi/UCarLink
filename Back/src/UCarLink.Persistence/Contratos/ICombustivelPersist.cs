using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Persistence.Contratos
{
    public interface ICombustivelPersist
    {
        Task<Combustivel[]> GetAllCombustiveisByDescricaoAsync(string descricao);
        Task<Combustivel[]> GetAllCombustiveisAsync();
        Task<Combustivel> GetCombustiveisByIdAsync(int IdCombustivel);

    }
}