using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UCarLink.Persistence.Contextos;
using UCarLink.Persistence.Contratos;
using UCarLink.Domain;

namespace UCarLink.Persistence
{
    public class ClientePersist : IClientePersist
    {
        private readonly UCarLinkContext _context;

        public ClientePersist(UCarLinkContext context)
        {
            _context = context;
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Cliente[]> GetAllClientesAsync()
        {
            IQueryable<Cliente> query = _context.Clientes;
            query = query.AsNoTracking().OrderBy(c => c.Nome);

            return await query.ToArrayAsync();
        }

        public async Task<Cliente> GetClientesByIdAsync(int IdCliente)
        {
            IQueryable<Cliente> query = _context.Clientes;
            query = query.AsNoTracking().OrderBy(c => c.Nome).Where(c => c.IdCliente == IdCliente);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Cliente[]> GetAllClientesByNomeAsync(string nome)
        {
            IQueryable<Cliente> query = _context.Clientes;
            query = query.AsNoTracking().OrderBy(c => c.Nome).Where(c => c.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }
    }
}