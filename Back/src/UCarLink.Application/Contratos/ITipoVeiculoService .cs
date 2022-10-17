using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Application.Contratos
{
    public interface ITipoVeiculoService
    {
        Task<TipoVeiculo> AddTipoVeiculo(TipoVeiculo model);
        Task<TipoVeiculo> UpdateTipoVeiculo(int idTipoVeiculo, TipoVeiculo model);
        Task<bool> DeleteTipoVeiculo(int idTipoVeiculo);
        Task<TipoVeiculo[]> GetAllTiposVeiculoAsync();
        Task<TipoVeiculo[]> GetAllTiposVeiculoByDescricaoAsync(string descricao);
        Task<TipoVeiculo> GetTiposVeiculoByIdAsync(int idTipoVeiculo);
    }
}