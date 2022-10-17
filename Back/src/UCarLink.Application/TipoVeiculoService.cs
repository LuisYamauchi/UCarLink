using System;
using System.Linq;
using System.Threading.Tasks;
using UCarLink.Application.Contratos;
using UCarLink.Domain;
using UCarLink.Persistence.Contratos;

namespace UCarLink.Application
{
    public class TipoVeiculoService : ITipoVeiculoService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly ITipoVeiculoPersist _tipoVeiculoPersist;
        
        public TipoVeiculoService(IGeralPersist geralPersist, ITipoVeiculoPersist tipoVeiculoPersist)
        {
            this._tipoVeiculoPersist = tipoVeiculoPersist;
            this._geralPersist = geralPersist;
        }

        public async Task<TipoVeiculo> AddTipoVeiculo(TipoVeiculo model)
        {
            try
            {
                _geralPersist.Add<TipoVeiculo>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _tipoVeiculoPersist.GetTiposVeiculoByIdAsync(model.IdTipoVeiculo);
                return null;
            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<TipoVeiculo> UpdateTipoVeiculo(int idTipoVeiculo, TipoVeiculo model)
        {
            try
            {
                var tipoVeiculo = await _tipoVeiculoPersist.GetTiposVeiculoByIdAsync(idTipoVeiculo);
                if(tipoVeiculo == null) return null;
                
                model.IdTipoVeiculo = tipoVeiculo.IdTipoVeiculo;

                _geralPersist.Update<TipoVeiculo>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _tipoVeiculoPersist.GetTiposVeiculoByIdAsync(model.IdTipoVeiculo);
                return null;

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteTipoVeiculo(int idTipoVeiculo)
        {
            try
            {
                var tipoVeiculo = await _tipoVeiculoPersist.GetTiposVeiculoByIdAsync(idTipoVeiculo);
                if(tipoVeiculo == null) throw new Exception("Tipo de Veiculo para delete não foi encontrado.");
                
                _geralPersist.Delete<TipoVeiculo>(tipoVeiculo);
                return await _geralPersist.SaveChangesAsync();

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<TipoVeiculo[]> GetAllTiposVeiculoAsync()
        {
           try
           {
                var tiposVeiculo = await _tipoVeiculoPersist.GetAllTiposVeiculoAsync();
                if(!tiposVeiculo.Any()) return null;

                return tiposVeiculo;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<TipoVeiculo[]> GetAllTiposVeiculoByDescricaoAsync(string descricao)
        {
           try
           {
                var tiposVeiculo = await _tipoVeiculoPersist.GetAllTiposVeiculoByDescricaoAsync(descricao);
                if(!tiposVeiculo.Any()) return null;

                return tiposVeiculo;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<TipoVeiculo> GetTiposVeiculoByIdAsync(int idTipoVeiculo)
        {
           try
           {
                var tipoVeiculo = await _tipoVeiculoPersist.GetTiposVeiculoByIdAsync(idTipoVeiculo);
                if(tipoVeiculo == null) return null;

                return tipoVeiculo;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }
    }
}