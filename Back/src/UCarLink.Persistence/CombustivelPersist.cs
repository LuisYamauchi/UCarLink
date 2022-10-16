using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UCarLink.Persistence.Contextos;
using UCarLink.Persistence.Contratos;
using UCarLink.Domain;

namespace UCarLink.Persistence
{
    public class CombustivelPersist : ICombustivelPersist
    {
        private readonly UCarLinkContext _context;

        public CombustivelPersist(UCarLinkContext context)
        {
            _context = context;
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Combustivel[]> GetAllCombustiveisAsync()
        {
            IQueryable<Combustivel> query = _context.Combustiveis;
            query = query.AsNoTracking().OrderBy(c => c.Descricao);

            return await query.ToArrayAsync();
        }

        public async Task<Combustivel> GetCombustiveisByIdAsync(int IdCombustivel)
        {
            IQueryable<Combustivel> query = _context.Combustiveis;
            query = query.AsNoTracking().OrderBy(c => c.Descricao).Where(c => c.IdCombustivel == IdCombustivel);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Combustivel[]> GetAllCombustiveisByDescricaoAsync(string descricao)
        {
            IQueryable<Combustivel> query = _context.Combustiveis;
            query = query.AsNoTracking().OrderBy(c => c.Descricao).Where(c => c.Descricao.ToLower().Contains(descricao.ToLower()));

            return await query.ToArrayAsync();
        }
    }
}