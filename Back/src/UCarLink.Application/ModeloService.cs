using System;
using System.Linq;
using System.Threading.Tasks;
using UCarLink.Application.Contratos;
using UCarLink.Domain;
using UCarLink.Persistence;
using UCarLink.Persistence.Contratos;

namespace UCarLink.Application
{
    public class ModeloService : IModeloService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IModeloPersist _modeloPersist;
        
        public ModeloService(IGeralPersist geralPersist, IModeloPersist modeloPersist)
        {
            this._modeloPersist = modeloPersist;
            this._geralPersist = geralPersist;
        }

        public async Task<Modelo> AddModelo(Modelo model)
        {
            try
            {
                _geralPersist.Add<Modelo>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _modeloPersist.GetModelosByIdAsync(model.IdModelo);
                return null;
            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<Modelo> UpdateModelo(int idModelo, Modelo model)
        {
            try
            {
                var modelo = await _modeloPersist.GetModelosByIdAsync(idModelo);
                if(modelo == null) return null;
                
                model.IdModelo = modelo.IdModelo;

                _geralPersist.Update<Modelo>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _modeloPersist.GetModelosByIdAsync(model.IdModelo);
                return null;

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteModelo(int idModelo)
        {
            try
            {
                var modelo = await _modeloPersist.GetModelosByIdAsync(idModelo);
                if(modelo == null) throw new Exception("Modelo para delete não foi encontrado.");
                
                _geralPersist.Delete<Modelo>(modelo);
                return await _geralPersist.SaveChangesAsync();

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<Modelo[]> GetAllModelosAsync()
        {
           try
           {
                var modelos = await _modeloPersist.GetAllModelosAsync();
                if(!modelos.Any()) return null;

                return modelos;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<Modelo[]> GetAllModelosByDescricaoAsync(string descricao)
        {
           try
           {
                var modelos = await _modeloPersist.GetAllModelosByDescricaoAsync(descricao);
                if(!modelos.Any()) return null;

                return modelos;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<Modelo> GetModelosByIdAsync(int idModelo)
        {
           try
           {
                var modelo = await _modeloPersist.GetModelosByIdAsync(idModelo);
                if(modelo == null) return null;

                return modelo;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }
    }
}