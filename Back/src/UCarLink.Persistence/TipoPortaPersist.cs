using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UCarLink.Persistence.Contextos;
using UCarLink.Persistence.Contratos;
using UCarLink.Domain;

namespace UCarLink.Persistence
{
    public class TipoPortaPersist : ITipoPortaPersist
    {
        private readonly UCarLinkContext _context;

        public TipoPortaPersist(UCarLinkContext context)
        {
            _context = context;
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<TipoPorta[]> GetAllTiposPortaAsync()
        {
            IQueryable<TipoPorta> query = _context.TiposPortas;
            query = query.AsNoTracking().OrderBy(c => c.Descricao);

            return await query.ToArrayAsync();
        }

        public async Task<TipoPorta> GetTiposPortaByIdAsync(int IdTipoPorta)
        {
            IQueryable<TipoPorta> query = _context.TiposPortas;
            query = query.AsNoTracking().OrderBy(c => c.Descricao).Where(c => c.IdTipoPorta == IdTipoPorta);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<TipoPorta[]> GetAllTiposPortaByDescricaoAsync(string descricao)
        {
            IQueryable<TipoPorta> query = _context.TiposPortas;
            query = query.AsNoTracking().OrderBy(c => c.Descricao).Where(c => c.Descricao.ToLower().Contains(descricao.ToLower()));

            return await query.ToArrayAsync();
        }
    }
}