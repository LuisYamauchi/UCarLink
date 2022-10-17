using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Persistence.Contratos
{
    public interface IMontadoraPersist
    {
        Task<Montadora[]> GetAllMontadorasByDescricaoAsync(string descricao);
        Task<Montadora[]> GetAllMontadorasAsync();
        Task<Montadora> GetMontadorasByIdAsync(int IdMontadora);

    }
}