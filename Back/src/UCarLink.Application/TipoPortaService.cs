using System;
using System.Linq;
using System.Threading.Tasks;
using UCarLink.Application.Contratos;
using UCarLink.Domain;
using UCarLink.Persistence.Contratos;

namespace UCarLink.Application
{
    public class TipoPortaService : ITipoPortaService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly ITipoPortaPersist _tipoPortaPersist;
        
        public TipoPortaService(IGeralPersist geralPersist, ITipoPortaPersist tipoPortaPersist)
        {
            this._tipoPortaPersist = tipoPortaPersist;
            this._geralPersist = geralPersist;
        }

        public async Task<TipoPorta> AddTipoPorta(TipoPorta model)
        {
            try
            {
                _geralPersist.Add<TipoPorta>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _tipoPortaPersist.GetTiposPortaByIdAsync(model.IdTipoPorta);
                return null;
            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<TipoPorta> UpdateTipoPorta(int idTipoPorta, TipoPorta model)
        {
            try
            {
                var tipoPorta = await _tipoPortaPersist.GetTiposPortaByIdAsync(idTipoPorta);
                if(tipoPorta == null) return null;
                
                model.IdTipoPorta = tipoPorta.IdTipoPorta;

                _geralPersist.Update<TipoPorta>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _tipoPortaPersist.GetTiposPortaByIdAsync(model.IdTipoPorta);
                return null;

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteTipoPorta(int idTipoPorta)
        {
            try
            {
                var tipoPorta = await _tipoPortaPersist.GetTiposPortaByIdAsync(idTipoPorta);
                if(tipoPorta == null) throw new Exception("Tipo de Porta para delete não foi encontrado.");
                
                _geralPersist.Delete<TipoPorta>(tipoPorta);
                return await _geralPersist.SaveChangesAsync();

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<TipoPorta[]> GetAllTiposPortaAsync()
        {
           try
           {
                var tiposPorta = await _tipoPortaPersist.GetAllTiposPortaAsync();
                if(!tiposPorta.Any()) return null;

                return tiposPorta;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<TipoPorta[]> GetAllTiposPortaByDescricaoAsync(string descricao)
        {
           try
           {
                var tiposPorta = await _tipoPortaPersist.GetAllTiposPortaByDescricaoAsync(descricao);
                if(!tiposPorta.Any()) return null;

                return tiposPorta;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<TipoPorta> GetTiposPortaByIdAsync(int idTipoPorta)
        {
           try
           {
                var tipoPorta = await _tipoPortaPersist.GetTiposPortaByIdAsync(idTipoPorta);
                if(tipoPorta == null) return null;

                return tipoPorta;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }
    }
}