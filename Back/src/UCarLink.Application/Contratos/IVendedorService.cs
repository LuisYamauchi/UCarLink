using System.Threading.Tasks;
using UCarLink.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using UCarLink.Application.Dtos;

namespace UCarLink.Application.Contratos
{
    public interface IVendedorService
    {
        Task<Vendedor> AddVendedor(Vendedor model);
        Task<Vendedor> UpdateVendedor(int idVendedor, Vendedor model);
        Task<bool> DeleteVendedor(int idVendedor);
        Task<Vendedor[]> GetAllVendedoresAsync();
        Task<Vendedor[]> GetAllVendedoresByNomeAsync(string nome);
        Task<Vendedor> GetVendedoresByIdAsync(int idVendedor);
        Task<Vendedor> CheckUserPasswordAsync(VendedorLoginDto user);
    }
}