using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Persistence.Contratos
{
    public interface ITipoVeiculoPersist
    {
        Task<TipoVeiculo[]> GetAllTiposVeiculoByDescricaoAsync(string descricao);
        Task<TipoVeiculo[]> GetAllTiposVeiculoAsync();
        Task<TipoVeiculo> GetTiposVeiculoByIdAsync(int IdTipoVeiculo);

    }
}