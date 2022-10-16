using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Application.Contratos
{
    public interface ICorVeiculoService
    {
        Task<CorVeiculo> AddCorVeiculo(CorVeiculo model);
        Task<CorVeiculo> UpdateCorVeiculo(int idCorVeiculo, CorVeiculo model);
        Task<bool> DeleteCorVeiculo(int idCorVeiculo);
        Task<CorVeiculo[]> GetAllCoresVeiculoAsync();
        Task<CorVeiculo[]> GetAllCoresVeiculoByDescricaoAsync(string descricao);
        Task<CorVeiculo> GetCoresVeiculoByIdAsync(int idCorVeiculo);
    }
}