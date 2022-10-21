using System;
using System.Linq;
using System.Threading.Tasks;
using UCarLink.Application.Contratos;
using UCarLink.Domain;
using UCarLink.Persistence;
using UCarLink.Persistence.Contratos;

namespace UCarLink.Application
{
    public class ConsultaService : IConsultaService
    {        
        private readonly IConsultaPersist _consultaPersist;
        
        public ConsultaService(IConsultaPersist consultaPersist)
        {
            this._consultaPersist = consultaPersist;
            //this._geralPersist = geralPersist;
        }   

        public async Task<Intencao[]> GetConsultaIntencoesByFiltros(Consulta model)
        {
           try
           {
                var intencoes = await _consultaPersist.GetConsultaIntencoesByFiltros(model);
                if(!intencoes.Any()) return null;

                return intencoes;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }
    }
}