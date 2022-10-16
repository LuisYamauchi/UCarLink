using System;
using System.Linq;
using System.Threading.Tasks;
using UCarLink.Application.Contratos;
using UCarLink.Domain;
using UCarLink.Persistence.Contratos;

namespace UCarLink.Application
{
    public class CombustivelService : ICombustivelService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly ICombustivelPersist _combustivelPersist;
        
        public CombustivelService(IGeralPersist geralPersist, ICombustivelPersist combustivelPersist)
        {
            this._combustivelPersist = combustivelPersist;
            this._geralPersist = geralPersist;
        }

        public async Task<Combustivel> AddCombustivel(Combustivel model)
        {
            try
            {
                _geralPersist.Add<Combustivel>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _combustivelPersist.GetCombustiveisByIdAsync(model.IdCombustivel);
                return null;
            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<Combustivel> UpdateCombustivel(int idCombustivel, Combustivel model)
        {
            try
            {
                var combustivel = await _combustivelPersist.GetCombustiveisByIdAsync(idCombustivel);
                if(combustivel == null) return null;
                
                model.IdCombustivel = combustivel.IdCombustivel;

                _geralPersist.Update<Combustivel>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _combustivelPersist.GetCombustiveisByIdAsync(model.IdCombustivel);
                return null;

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteCombustivel(int idCombustivel)
        {
            try
            {
                var combustivel = await _combustivelPersist.GetCombustiveisByIdAsync(idCombustivel);
                if(combustivel == null) throw new Exception("Combustivel para delete não foi encontrado.");
                
                _geralPersist.Delete<Combustivel>(combustivel);
                return await _geralPersist.SaveChangesAsync();

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<Combustivel[]> GetAllCombustiveisAsync()
        {
           try
           {
                var combustiveis = await _combustivelPersist.GetAllCombustiveisAsync();
                if(!combustiveis.Any()) return null;

                return combustiveis;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<Combustivel[]> GetAllCombustiveisByDescricaoAsync(string descricao)
        {
           try
           {
                var combustiveis = await _combustivelPersist.GetAllCombustiveisByDescricaoAsync(descricao);
                if(!combustiveis.Any()) return null;

                return combustiveis;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<Combustivel> GetCombustiveisByIdAsync(int idCombustivel)
        {
           try
           {
                var combustivel = await _combustivelPersist.GetCombustiveisByIdAsync(idCombustivel);
                if(combustivel == null) return null;

                return combustivel;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }
    }
}