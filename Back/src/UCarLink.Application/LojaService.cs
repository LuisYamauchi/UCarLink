using System;
using System.Linq;
using System.Threading.Tasks;
using UCarLink.Application.Contratos;
using UCarLink.Domain;
using UCarLink.Persistence.Contratos;

namespace UCarLink.Application
{
    public class LojaService : ILojaService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly ILojaPersist _lojaPersist;
        
        public LojaService(IGeralPersist geralPersist, ILojaPersist lojaPersist)
        {
            this._lojaPersist = lojaPersist;
            this._geralPersist = geralPersist;
        }

        public async Task<Loja> AddLoja(Loja model)
        {
            try
            {
                _geralPersist.Add<Loja>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _lojaPersist.GetLojasByIdAsync(model.IdLoja);
                return null;
            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<Loja> UpdateLoja(int idLoja, Loja model)
        {
            try
            {
                var loja = await _lojaPersist.GetLojasByIdAsync(idLoja);
                if(loja == null) return null;
                
                model.IdLoja = loja.IdLoja;

                _geralPersist.Update<Loja>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _lojaPersist.GetLojasByIdAsync(model.IdLoja);
                return null;

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteLoja(int idLoja)
        {
            try
            {
                var loja = await _lojaPersist.GetLojasByIdAsync(idLoja);
                if(loja == null) throw new Exception("Loja para delete não foi encontrado.");
                
                _geralPersist.Delete<Loja>(loja);
                return await _geralPersist.SaveChangesAsync();

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<Loja[]> GetAllLojasAsync()
        {
           try
           {
                var lojas = await _lojaPersist.GetAllLojasAsync();
                if(!lojas.Any()) return null;

                return lojas;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<Loja[]> GetAllLojasByNomeAsync(string nome)
        {
           try
           {
                var lojas = await _lojaPersist.GetAllLojasByNomeAsync(nome);
                if(!lojas.Any()) return null;

                return lojas;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<Loja> GetLojasByIdAsync(int idLoja)
        {
           try
           {
                var loja = await _lojaPersist.GetLojasByIdAsync(idLoja);
                if(loja == null) return null;

                return loja;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }
    }
}