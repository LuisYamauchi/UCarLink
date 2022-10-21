using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UCarLink.Persistence.Contextos;
using UCarLink.Persistence.Contratos;
using UCarLink.Domain;

namespace UCarLink.Persistence
{
    public class ConsultaPersist : IConsultaPersist
    {
        private readonly UCarLinkContext _context;

        public ConsultaPersist(UCarLinkContext context)
        {
            _context = context;
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }   

        public async Task<Intencao[]> GetConsultaIntencoesByFiltros(Consulta model)
        {

            IQueryable<Intencao> query = _context.Intencoes;
            query = query.AsNoTracking(); //.Where(c => c..ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();

            /*IQueryable<Intencao> query = _context.Intencoes;
            query = query.AsNoTracking().OrderBy(c => c.DataCadastro).Where(c => c.IdIntencao == IdIntencao);

            return await query.FirstOrDefaultAsync();*/
        }
    }
}