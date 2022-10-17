using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Persistence.Contratos
{
    public interface IModeloPersist
    {
        Task<Modelo[]> GetAllModelosByDescricaoAsync(string descricao);
        Task<Modelo[]> GetAllModelosAsync();
        Task<Modelo> GetModelosByIdAsync(int IdModelo);

    }
}