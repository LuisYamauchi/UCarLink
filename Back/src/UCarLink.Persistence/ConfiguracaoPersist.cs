using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UCarLink.Persistence.Contextos;
using UCarLink.Persistence.Contratos;
using UCarLink.Domain;

namespace UCarLink.Persistence
{
    public class ConfiguracaoPersist : IConfiguracaoPersist
    {
        private readonly UCarLinkContext _context;

        public ConfiguracaoPersist(UCarLinkContext context)
        {
            _context = context;
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Configuracao[]> GetAllConfiguracoesAsync()
        {
            IQueryable<Configuracao> query = _context.Configuracoes;
            query = query.AsNoTracking();

            return await query.ToArrayAsync();
        }

        public async Task<Configuracao> GetConfiguracoesByIdAsync(int IdConfiguracao)
        {
            IQueryable<Configuracao> query = _context.Configuracoes;
            query = query.AsNoTracking().Where(c => c.IdConfiguracao == IdConfiguracao);

            return await query.FirstOrDefaultAsync();
        }    
    }
}