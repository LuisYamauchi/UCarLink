using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Persistence.Contratos
{
    public interface ITipoPortaPersist
    {
        Task<TipoPorta[]> GetAllTiposPortaByDescricaoAsync(string descricao);
        Task<TipoPorta[]> GetAllTiposPortaAsync();
        Task<TipoPorta> GetTiposPortaByIdAsync(int IdTipoPorta);

    }
}