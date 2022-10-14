using System.Threading.Tasks;
using UCarLink.Domain;

namespace UCarLink.Persistence.Contratos
{
    public interface IVendedorPersist
    {
        Task<Vendedor[]> GetAllVendedoresByNomeAsync(string nome);
        Task<Vendedor[]> GetAllVendedoresAsync();
        Task<Vendedor> GetVendedoresByIdAsync(int IdVendedor);

    }
}