using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Application.Contratos
{
    public interface IMontadoraService
    {
        Task<Montadora> AddMontadora(Montadora model);
        Task<Montadora> UpdateMontadora(int idMontadora, Montadora model);
        Task<bool> DeleteMontadora(int idMontadora);
        Task<Montadora[]> GetAllMontadorasAsync();
        Task<Montadora[]> GetAllMontadorasByDescricaoAsync(string descricao);
        Task<Montadora> GetMontadorasByIdAsync(int idMontadora);
    }
}