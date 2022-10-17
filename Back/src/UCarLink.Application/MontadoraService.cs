using System;
using System.Linq;
using System.Threading.Tasks;
using UCarLink.Application.Contratos;
using UCarLink.Domain;
using UCarLink.Persistence.Contratos;

namespace UCarLink.Application
{
    public class MontadoraService : IMontadoraService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IMontadoraPersist _montadoraPersist;
        
        public MontadoraService(IGeralPersist geralPersist, IMontadoraPersist montadoraPersist)
        {
            this._montadoraPersist = montadoraPersist;
            this._geralPersist = geralPersist;
        }

        public async Task<Montadora> AddMontadora(Montadora model)
        {
            try
            {
                _geralPersist.Add<Montadora>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _montadoraPersist.GetMontadorasByIdAsync(model.IdMontadora);
                return null;
            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<Montadora> UpdateMontadora(int idMontadora, Montadora model)
        {
            try
            {
                var montadora = await _montadoraPersist.GetMontadorasByIdAsync(idMontadora);
                if(montadora == null) return null;
                
                model.IdMontadora = montadora.IdMontadora;

                _geralPersist.Update<Montadora>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _montadoraPersist.GetMontadorasByIdAsync(model.IdMontadora);
                return null;

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteMontadora(int idMontadora)
        {
            try
            {
                var montadora = await _montadoraPersist.GetMontadorasByIdAsync(idMontadora);
                if(montadora == null) throw new Exception("Montadora para delete não foi encontrado.");
                
                _geralPersist.Delete<Montadora>(montadora);
                return await _geralPersist.SaveChangesAsync();

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<Montadora[]> GetAllMontadorasAsync()
        {
           try
           {
                var montadoras = await _montadoraPersist.GetAllMontadorasAsync();
                if(!montadoras.Any()) return null;

                return montadoras;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<Montadora[]> GetAllMontadorasByDescricaoAsync(string descricao)
        {
           try
           {
                var montadoras = await _montadoraPersist.GetAllMontadorasByDescricaoAsync(descricao);
                if(!montadoras.Any()) return null;

                return montadoras;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<Montadora> GetMontadorasByIdAsync(int idMontadora)
        {
           try
           {
                var montadora = await _montadoraPersist.GetMontadorasByIdAsync(idMontadora);
                if(montadora == null) return null;

                return montadora;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }
    }
}