using System;
using System.Linq;
using System.Threading.Tasks;
using UCarLink.Application.Contratos;
using UCarLink.Application.Dtos;
using UCarLink.Domain;
using UCarLink.Persistence.Contratos;

namespace UCarLink.Application
{
    public class VendedorService : IVendedorService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IVendedorPersist _vendedorPersist;
        
        public VendedorService(IGeralPersist geralPersist, IVendedorPersist vendedorPersist)
        {
            this._vendedorPersist = vendedorPersist;
            this._geralPersist = geralPersist;
        }

        public async Task<Vendedor> AddVendedor(Vendedor model)
        {
            try
            {
                _geralPersist.Add<Vendedor>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _vendedorPersist.GetVendedoresByIdAsync(model.IdVendedor);
                return null;
            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message + "\n" + ex.InnerException);
            }
        }

        public async Task<Vendedor> UpdateVendedor(int idVendedor, Vendedor model)
        {
            try
            {
                var vendedor = await _vendedorPersist.GetVendedoresByIdAsync(idVendedor);
                if(vendedor == null) return null;
                
                model.IdVendedor = vendedor.IdVendedor;

                _geralPersist.Update<Vendedor>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _vendedorPersist.GetVendedoresByIdAsync(model.IdVendedor);
                return null;

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteVendedor(int idVendedor)
        {
            try
            {
                var vendedor = await _vendedorPersist.GetVendedoresByIdAsync(idVendedor);
                if(vendedor == null) throw new Exception("Vendedor para delete não foi encontrado.");
                
                _geralPersist.Delete<Vendedor>(vendedor);
                return await _geralPersist.SaveChangesAsync();

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<Vendedor[]> GetAllVendedoresAsync()
        {
           try
           {
                var vendedores = await _vendedorPersist.GetAllVendedoresAsync();
                if(!vendedores.Any()) return null;

                return vendedores;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<Vendedor[]> GetAllVendedoresByNomeAsync(string nome)
        {
           try
           {
                var vendedores = await _vendedorPersist.GetAllVendedoresByNomeAsync(nome);
                if(!vendedores.Any()) return null;

                return vendedores;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<Vendedor> GetVendedoresByIdAsync(int idVendedor)
        {
           try
           {
                var vendedor = await _vendedorPersist.GetVendedoresByIdAsync(idVendedor);
                if(vendedor == null) return null;

                return vendedor;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }
        public async Task<Vendedor> CheckUserPasswordAsync(VendedorLoginDto user)
        {
            try
            {
                var vendedores = await _vendedorPersist.GetAllVendedoresByNomeAsync(user.Username);
                if(!vendedores.Any() || vendedores[0].Password != user.Password) return null;
                return vendedores[0];
            }
            catch (System.Exception ex)
            {
                throw new Exception($"Erro ao tentar verificar password. Erro: {ex.Message}");
            }
        }
    }
}