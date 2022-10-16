using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Persistence.Contratos
{
    public interface ICorVeiculoPersist
    {
        Task<CorVeiculo[]> GetAllCoresVeiculoByDescricaoAsync(string descricao);
        Task<CorVeiculo[]> GetAllCoresVeiculoAsync();
        Task<CorVeiculo> GetCoresVeiculoByIdAsync(int IdCorVeiculo);

    }
}