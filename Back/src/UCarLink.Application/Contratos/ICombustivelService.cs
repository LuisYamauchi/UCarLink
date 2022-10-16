using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Application.Contratos
{
    public interface ICombustivelService
    {
        Task<Combustivel> AddCombustivel(Combustivel model);
        Task<Combustivel> UpdateCombustivel(int idCombustivel, Combustivel model);
        Task<bool> DeleteCombustivel(int idCombustivel);
        Task<Combustivel[]> GetAllCombustiveisAsync();
        Task<Combustivel[]> GetAllCombustiveisByDescricaoAsync(string descricao);
        Task<Combustivel> GetCombustiveisByIdAsync(int idCombustivel);
    }
}