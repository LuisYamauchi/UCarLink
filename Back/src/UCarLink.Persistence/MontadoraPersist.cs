using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UCarLink.Persistence.Contextos;
using UCarLink.Persistence.Contratos;
using UCarLink.Domain;

namespace UCarLink.Persistence
{
    public class MontadoraPersist : IMontadoraPersist
    {
        private readonly UCarLinkContext _context;

        public MontadoraPersist(UCarLinkContext context)
        {
            _context = context;
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Montadora[]> GetAllMontadorasAsync()
        {
            IQueryable<Montadora> query = _context.Montadoras;
            query = query.AsNoTracking().OrderBy(c => c.Descricao);

            return await query.ToArrayAsync();
        }

        public async Task<Montadora> GetMontadorasByIdAsync(int IdMontadora)
        {
            IQueryable<Montadora> query = _context.Montadoras;
            query = query.AsNoTracking().OrderBy(c => c.Descricao).Where(c => c.IdMontadora == IdMontadora);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Montadora[]> GetAllMontadorasByDescricaoAsync(string descricao)
        {
            IQueryable<Montadora> query = _context.Montadoras;
            query = query.AsNoTracking().OrderBy(c => c.Descricao).Where(c => c.Descricao.ToLower().Contains(descricao.ToLower()));

            return await query.ToArrayAsync();
        }
    }
}