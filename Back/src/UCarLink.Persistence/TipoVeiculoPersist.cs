using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UCarLink.Persistence.Contextos;
using UCarLink.Persistence.Contratos;
using UCarLink.Domain;

namespace UCarLink.Persistence
{
    public class TipoVeiculoPersist : ITipoVeiculoPersist
    {
        private readonly UCarLinkContext _context;

        public TipoVeiculoPersist(UCarLinkContext context)
        {
            _context = context;
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<TipoVeiculo[]> GetAllTiposVeiculoAsync()
        {
            IQueryable<TipoVeiculo> query = _context.TiposVeiculo;
            query = query.AsNoTracking().OrderBy(c => c.Descricao);

            return await query.ToArrayAsync();
        }

        public async Task<TipoVeiculo> GetTiposVeiculoByIdAsync(int IdTipoVeiculo)
        {
            IQueryable<TipoVeiculo> query = _context.TiposVeiculo;
            query = query.AsNoTracking().OrderBy(c => c.Descricao).Where(c => c.IdTipoVeiculo == IdTipoVeiculo);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<TipoVeiculo[]> GetAllTiposVeiculoByDescricaoAsync(string descricao)
        {
            IQueryable<TipoVeiculo> query = _context.TiposVeiculo;
            query = query.AsNoTracking().OrderBy(c => c.Descricao).Where(c => c.Descricao.ToLower().Contains(descricao.ToLower()));

            return await query.ToArrayAsync();
        }
    }
}