using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Persistence.Contratos
{
    public interface IConfiguracaoPersist
    {        
        Task<Configuracao[]> GetAllConfiguracoesAsync();
        Task<Configuracao> GetConfiguracoesByIdAsync(int IdCliente);

    }
}