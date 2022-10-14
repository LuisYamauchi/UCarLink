using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Application.Contratos
{
    public interface ILojaService
    {
        Task<Loja> AddLoja(Loja model);
        Task<Loja> UpdateLoja(int idLoja, Loja model);
        Task<bool> DeleteLoja(int idLoja);
        Task<Loja[]> GetAllLojasAsync();
        Task<Loja[]> GetAllLojasByNomeAsync(string nome);
        Task<Loja> GetLojasByIdAsync(int idLoja);
    }
}