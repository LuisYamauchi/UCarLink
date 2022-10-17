using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Application.Contratos
{
    public interface IModeloService
    {
        Task<Modelo> AddModelo(Modelo model);
        Task<Modelo> UpdateModelo(int idModelo, Modelo model);
        Task<bool> DeleteModelo(int idModelo);
        Task<Modelo[]> GetAllModelosAsync();
        Task<Modelo[]> GetAllModelosByDescricaoAsync(string descricao);
        Task<Modelo> GetModelosByIdAsync(int idModelo);
    }
}