using System;
using System.Linq;
using System.Threading.Tasks;
using UCarLink.Application.Contratos;
using UCarLink.Domain;
using UCarLink.Persistence;
using UCarLink.Persistence.Contratos;

namespace UCarLink.Application
{
    public class ConfiguracaoService : IConfiguracaoService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IConfiguracaoPersist _configuracaoPersist;
        
        public ConfiguracaoService(IGeralPersist geralPersist, IConfiguracaoPersist configuracaoPersist)
        {
            this._configuracaoPersist = configuracaoPersist;
            this._geralPersist = geralPersist;
        }

        public async Task<Configuracao> AddConfiguracao(Configuracao model)
        {
            try
            {
                _geralPersist.Add<Configuracao>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _configuracaoPersist.GetConfiguracoesByIdAsync(model.IdConfiguracao);
                return null;
            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<Configuracao> UpdateConfiguracao(int idConfiguracao, Configuracao model)
        {
            try
            {
                var configuracao = await _configuracaoPersist.GetConfiguracoesByIdAsync(idConfiguracao);
                if(configuracao == null) return null;
                
                model.IdConfiguracao = configuracao.IdConfiguracao;

                _geralPersist.Update<Configuracao>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _configuracaoPersist.GetConfiguracoesByIdAsync(model.IdConfiguracao);
                return null;

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }    

        public async Task<Configuracao[]> GetAllConfiguracoesAsync()
        {
           try
           {
                var configuracoes = await _configuracaoPersist.GetAllConfiguracoesAsync();
                if(!configuracoes.Any()) return null;

                return configuracoes;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<Configuracao> GetConfiguracoesByIdAsync(int idConfiguracao)
        {
            try
            {
                var configuracao = await _configuracaoPersist.GetConfiguracoesByIdAsync(idConfiguracao);
                if (configuracao == null) return null;

                return configuracao;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}