using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Application.Contratos
{
    public interface IConfiguracaoService
    {
        Task<Configuracao> AddConfiguracao(Configuracao model);
        Task<Configuracao> UpdateConfiguracao(int idConfiguracao, Configuracao model);    
        Task<Configuracao[]> GetAllConfiguracoesAsync();
        Task<Configuracao> GetConfiguracoesByIdAsync(int idCliente);
    }
}