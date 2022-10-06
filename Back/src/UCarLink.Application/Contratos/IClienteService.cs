using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Application.Contratos
{
    public interface IClienteService
    {
        Task<Cliente> AddCliente(Cliente model);
        Task<Cliente> UpdateCliente(int idCliente, Cliente model);
        Task<bool> DeleteCliente(int idCliente);
        Task<Cliente[]> GetAllClientesAsync();
        Task<Cliente[]> GetAllClientesByNomeAsync(string nome);
        Task<Cliente> GetClientesByIdAsync(int idCliente);
    }
}