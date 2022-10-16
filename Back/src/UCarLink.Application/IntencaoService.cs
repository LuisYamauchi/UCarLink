using System;
using System.Linq;
using System.Threading.Tasks;
using UCarLink.Application.Contratos;
using UCarLink.Domain;
using UCarLink.Persistence.Contratos;

namespace UCarLink.Application
{
    public class IntencaoService : IIntencaoService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IIntencaoPersist _intencaoPersist;
        
        public IntencaoService(IGeralPersist geralPersist, IIntencaoPersist intencaoPersist)
        {
            this._intencaoPersist = intencaoPersist;
            this._geralPersist = geralPersist;
        }

        public async Task<Intencao> AddIntencao(Intencao model)
        {
            try
            {
                _geralPersist.Add<Intencao>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _intencaoPersist.GetIntencoesByIdAsync(model.IdIntencao);
                return null;
            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message + "\n" + ex.InnerException);
            }
        }

        public async Task<Intencao> UpdateIntencao(int idIntencao, Intencao model)
        {
            try
            {
                var intencao = await _intencaoPersist.GetIntencoesByIdAsync(idIntencao);
                if(intencao == null) return null;
                
                model.IdIntencao = intencao.IdIntencao;

                _geralPersist.Update<Intencao>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _intencaoPersist.GetIntencoesByIdAsync(model.IdIntencao);
                return null;

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteIntencao(int idIntencao)
        {
            try
            {
                var intencao = await _intencaoPersist.GetIntencoesByIdAsync(idIntencao);
                if(intencao == null) throw new Exception("Intencao para delete não foi encontrado.");
                
                _geralPersist.Delete<Intencao>(intencao);
                return await _geralPersist.SaveChangesAsync();

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<Intencao[]> GetAllIntencoesAsync()
        {
           try
           {
                var intencoes = await _intencaoPersist.GetAllIntencoesAsync();
                if(!intencoes.Any()) return null;

                return intencoes;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<Intencao[]> GetAllIntencoesByNomeAsync(string nome)
        {
           try
           {
                var intencoes = await _intencaoPersist.GetAllIntencoesByNomeAsync(nome);
                if(!intencoes.Any()) return null;

                return intencoes;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<Intencao> GetIntencoesByIdAsync(int idIntencao)
        {
           try
           {
                var intencao = await _intencaoPersist.GetIntencoesByIdAsync(idIntencao);
                if(intencao == null) return null;

                return intencao;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }
    }
}