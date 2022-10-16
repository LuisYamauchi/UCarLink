using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UCarLink.Persistence.Contextos;
using UCarLink.Persistence.Contratos;
using UCarLink.Domain;

namespace UCarLink.Persistence
{
    public class CorVeiculoPersist : ICorVeiculoPersist
    {
        private readonly UCarLinkContext _context;

        public CorVeiculoPersist(UCarLinkContext context)
        {
            _context = context;
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<CorVeiculo[]> GetAllCoresVeiculoAsync()
        {
            IQueryable<CorVeiculo> query = _context.CoresVeiculo;
            query = query.AsNoTracking().OrderBy(c => c.Descricao);

            return await query.ToArrayAsync();
        }

        public async Task<CorVeiculo> GetCoresVeiculoByIdAsync(int IdCorVeiculo)
        {
            IQueryable<CorVeiculo> query = _context.CoresVeiculo;
            query = query.AsNoTracking().OrderBy(c => c.Descricao).Where(c => c.IdCorVeiculo == IdCorVeiculo);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<CorVeiculo[]> GetAllCoresVeiculoByDescricaoAsync(string descricao)
        {
            IQueryable<CorVeiculo> query = _context.CoresVeiculo;
            query = query.AsNoTracking().OrderBy(c => c.Descricao).Where(c => c.Descricao.ToLower().Contains(descricao.ToLower()));

            return await query.ToArrayAsync();
        }
    }
}