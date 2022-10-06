using Microsoft.EntityFrameworkCore;
using UCarLink.Domain;

namespace UCarLink.Persistence.Contextos
{
    public class UCarLinkContext : DbContext
    {
        public UCarLinkContext(DbContextOptions<UCarLinkContext> options) : base(options) { }
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
        
        //para tabelas com chave composta.
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Classe>()
        //    .HasKey(C => new {C.Id1, C.Id2} );
        //}
    }
}