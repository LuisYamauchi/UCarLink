using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UCarLink.Persistence.Contextos;
using UCarLink.Persistence.Contratos;
using UCarLink.Domain;

namespace UCarLink.Persistence
{
    public class LojaPersist : ILojaPersist
    {
        private readonly UCarLinkContext _context;

        public LojaPersist(UCarLinkContext context)
        {
            _context = context;
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Loja[]> GetAllLojasAsync()
        {
            IQueryable<Loja> query = _context.Lojas;
            query = query.AsNoTracking().OrderBy(c => c.Nome);

            return await query.ToArrayAsync();
        }

        public async Task<Loja> GetLojasByIdAsync(int IdLoja)
        {
            IQueryable<Loja> query = _context.Lojas;
            query = query.AsNoTracking().OrderBy(c => c.Nome).Where(c => c.IdLoja == IdLoja);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Loja[]> GetAllLojasByNomeAsync(string nome)
        {
            IQueryable<Loja> query = _context.Lojas;
            query = query.AsNoTracking().OrderBy(c => c.Nome).Where(c => c.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }
    }
}