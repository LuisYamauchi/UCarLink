using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UCarLink.Persistence.Contextos;
using UCarLink.Persistence.Contratos;
using UCarLink.Domain;

namespace UCarLink.Persistence
{
    public class IntencaoPersist : IIntencaoPersist
    {
        private readonly UCarLinkContext _context;

        public IntencaoPersist(UCarLinkContext context)
        {
            _context = context;
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public async Task<Intencao[]> GetAllIntencoesAsync()
        {
            IQueryable<Intencao> query = _context.Intencoes;
            query = query.AsNoTracking().OrderBy(c => c.DataCadastro);

            return await query.ToArrayAsync();
        }

        public async Task<Intencao> GetIntencoesByIdAsync(int IdIntencao)
        {
            IQueryable<Intencao> query = _context.Intencoes;
            query = query.AsNoTracking().OrderBy(c => c.DataCadastro).Where(c => c.IdIntencao == IdIntencao);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Intencao[]> GetAllIntencoesByNomeAsync(string nome)
        {

            IQueryable<Intencao> query = _context.Intencoes;
            query = query.AsNoTracking().OrderBy(c => c.DataCadastro); //.Where(c => c..ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }
    }
}