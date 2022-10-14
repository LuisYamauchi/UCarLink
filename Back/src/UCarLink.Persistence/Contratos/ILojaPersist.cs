using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Persistence.Contratos
{
    public interface ILojaPersist
    {
        Task<Loja[]> GetAllLojasByNomeAsync(string nome);
        Task<Loja[]> GetAllLojasAsync();
        Task<Loja> GetLojasByIdAsync(int IdLoja);

    }
}