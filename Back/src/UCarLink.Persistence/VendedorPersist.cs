using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UCarLink.Persistence.Contextos;
using UCarLink.Persistence.Contratos;
using UCarLink.Domain;

namespace UCarLink.Persistence
{
    public class VendedorPersist : IVendedorPersist
    {
        private readonly UCarLinkContext _context;

        public VendedorPersist(UCarLinkContext context)
        {
            _context = context;
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Vendedor[]> GetAllVendedoresAsync()
        {
            IQueryable<Vendedor> query = _context.Vendedores;
            query = query.AsNoTracking().OrderBy(c => c.Nome);

            return await query.ToArrayAsync();
        }

        public async Task<Vendedor> GetVendedoresByIdAsync(int IdVendedor)
        {
            IQueryable<Vendedor> query = _context.Vendedores;
            query = query.AsNoTracking().OrderBy(c => c.Nome).Where(c => c.IdVendedor == IdVendedor);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Vendedor[]> GetAllVendedoresByNomeAsync(string nome)
        {
            IQueryable<Vendedor> query = _context.Vendedores;
            query = query.AsNoTracking().OrderBy(c => c.Nome).Where(c => c.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }
    }
}