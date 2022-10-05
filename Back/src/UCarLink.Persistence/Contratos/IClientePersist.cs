using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Persistence.Contratos
{
    public interface IClientePersist
    {
        Task<Cliente[]> GetAllClientesByNomeAsync(string nome);
        Task<Cliente[]> GetAllClientesAsync();
        Task<Cliente> GetAllClientesByIdAsync(int IdCliente);

    }
}