using System;
using System.Linq;
using System.Threading.Tasks;
using UCarLink.Application.Contratos;
using UCarLink.Domain;
using UCarLink.Persistence.Contratos;

namespace UCarLink.Application
{
    public class ClienteService : IClienteService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IClientePersist _clientePersist;
        
        public ClienteService(IGeralPersist geralPersist, IClientePersist clientePersist)
        {
            this._clientePersist = clientePersist;
            this._geralPersist = geralPersist;
        }

        public async Task<Cliente> AddCliente(Cliente model)
        {
            try
            {
                _geralPersist.Add<Cliente>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _clientePersist.GetClientesByIdAsync(model.IdCliente);
                return null;
            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<Cliente> UpdateCliente(int idCliente, Cliente model)
        {
            try
            {
                var cliente = await _clientePersist.GetClientesByIdAsync(idCliente);
                if(cliente == null) return null;
                
                model.IdCliente = cliente.IdCliente;

                _geralPersist.Update<Cliente>(model);
                if(await _geralPersist.SaveChangesAsync())
                    return await _clientePersist.GetClientesByIdAsync(model.IdCliente);
                return null;

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteCliente(int idCliente)
        {
            try
            {
                var cliente = await _clientePersist.GetClientesByIdAsync(idCliente);
                if(cliente == null) throw new Exception("Cliente para delete não foi encontrado.");
                
                _geralPersist.Update<Cliente>(cliente);
                return await _geralPersist.SaveChangesAsync();

            }
            catch (System.Exception ex)
            {
                
                throw new Exception(ex.Message);
            }
        }

        public async Task<Cliente[]> GetAllClientesAsync()
        {
           try
           {
                var clientes = await _clientePersist.GetAllClientesAsync();
                if(!clientes.Any()) return null;

                return clientes;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<Cliente[]> GetAllClientesByNomeAsync(string nome)
        {
           try
           {
                var clientes = await _clientePersist.GetAllClientesByNomeAsync(nome);
                if(!clientes.Any()) return null;

                return clientes;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        public async Task<Cliente> GetClientesByIdAsync(int idCliente)
        {
           try
           {
                var cliente = await _clientePersist.GetClientesByIdAsync(idCliente);
                if(cliente == null) return null;

                return cliente;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }
    }
}