using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UCarLink.Persistence.Contextos;
using UCarLink.Persistence.Contratos;
using UCarLink.Domain;

namespace UCarLink.Persistence
{
    public class ModeloPersist : IModeloPersist
    {
        private readonly UCarLinkContext _context;

        public ModeloPersist(UCarLinkContext context)
        {
            _context = context;
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Modelo[]> GetAllModelosAsync()
        {
            IQueryable<Modelo> query = _context.Modelos;
            query = query.AsNoTracking().OrderBy(c => c.Descricao);

            return await query.ToArrayAsync();
        }

        public async Task<Modelo> GetModelosByIdAsync(int IdModelo)
        {
            IQueryable<Modelo> query = _context.Modelos;
            query = query.AsNoTracking().OrderBy(c => c.Descricao).Where(c => c.IdModelo == IdModelo);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Modelo[]> GetAllModelosByDescricaoAsync(string descricao)
        {
            IQueryable<Modelo> query = _context.Modelos;
            query = query.AsNoTracking().OrderBy(c => c.Descricao).Where(c => c.Descricao.ToLower().Contains(descricao.ToLower()));

            return await query.ToArrayAsync();
        }
    }
}