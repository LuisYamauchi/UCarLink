using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UCarLink.API.Models;

namespace UCarLink.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Combustivel> Combustiveis { get; set; }
        public DbSet<Configuracao> Configuracoes { get; set; }
        public DbSet<CorVeiculo> CoresVeiculo { get; set; }
        public DbSet<Loja> Lojas { get; set; }
        public DbSet<Montadora> Montadoras { get; set; }
        public DbSet<TipoPorta> TiposPortas { get; set; }
        public DbSet<TipoVeiculo> TiposVeiculo { get; set; }
        public DbSet<Vendedor> Vendedores { get; set; }
        public DbSet<Modelo> Modelos { get; set; }
        public DbSet<Intencao> Intencoes { get; set; }
    }
}