using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Application.Contratos
{
    public interface ITipoPortaService
    {
        Task<TipoPorta> AddTipoPorta(TipoPorta model);
        Task<TipoPorta> UpdateTipoPorta(int idTipoPorta, TipoPorta model);
        Task<bool> DeleteTipoPorta(int idTipoPorta);
        Task<TipoPorta[]> GetAllTiposPortaAsync();
        Task<TipoPorta[]> GetAllTiposPortaByDescricaoAsync(string descricao);
        Task<TipoPorta> GetTiposPortaByIdAsync(int idTipoPorta);
    }
}