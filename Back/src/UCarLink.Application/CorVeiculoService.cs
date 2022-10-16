using System;
using System.Linq;
using System.Threading.Tasks;
using UCarLink.Application.Contratos;
using UCarLink.Domain;
using UCarLink.Persistence.Contratos;

namespace UCarLink.Application
{
    public class CorVeiculoService : ICorVeiculoService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly ICorVeiculoPersist _corVeiculoPersist;
        
        public CorVeiculoService(IGeralPersist geralPersist, ICorVeiculoPersist corVeiculoPersist)
        {
            this._corVeiculoPersist = corVeiculoPersist;
            this._geralPersist = geralPersist;
        }

        public async Task<CorVeiculo> AddCorVeiculo(CorVeiculo model)
        {
            try
            {
                _geralPersist.Add<CorVeiculo>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _corVeiculoPersist.GetCoresVeiculoByIdAsync(model.IdCorVeiculo);
                return null;
            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<CorVeiculo> UpdateCorVeiculo(int idCorVeiculo, CorVeiculo model)
        {
            try
            {
                var corVeiculo = await _corVeiculoPersist.GetCoresVeiculoByIdAsync(idCorVeiculo);
                if(corVeiculo == null) return null;
                
                model.IdCorVeiculo = corVeiculo.IdCorVeiculo;

                _geralPersist.Update<CorVeiculo>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _corVeiculoPersist.GetCoresVeiculoByIdAsync(model.IdCorVeiculo);
                return null;

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteCorVeiculo(int idCorVeiculo)
        {
            try
            {
                var corVeiculo = await _corVeiculoPersist.GetCoresVeiculoByIdAsync(idCorVeiculo);
                if(corVeiculo == null) throw new Exception("Cor para delete não foi encontrada.");
                
                _geralPersist.Delete<CorVeiculo>(corVeiculo);
                return await _geralPersist.SaveChangesAsync();

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<CorVeiculo[]> GetAllCoresVeiculoAsync()
        {
           try
           {
                var coresVeiculo = await _corVeiculoPersist.GetAllCoresVeiculoAsync();
                if(!coresVeiculo.Any()) return null;

                return coresVeiculo;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<CorVeiculo[]> GetAllCoresVeiculoByDescricaoAsync(string descricao)
        {
           try
           {
                var coresVeiculo = await _corVeiculoPersist.GetAllCoresVeiculoByDescricaoAsync(descricao);
                if(!coresVeiculo.Any()) return null;

                return coresVeiculo;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<CorVeiculo> GetCoresVeiculoByIdAsync(int idCorVeiculo)
        {
           try
           {
                var corVeiculo = await _corVeiculoPersist.GetCoresVeiculoByIdAsync(idCorVeiculo);
                if(corVeiculo == null) return null;

                return corVeiculo;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }
    }
}