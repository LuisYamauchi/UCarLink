using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UCarLink.Persistence.Contextos;
using UCarLink.Persistence.Contratos;
using UCarLink.Domain;
using UCarLink.Persistence.Extensions;
using System;

namespace UCarLink.Persistence
{
    public class ConsultaPersist : IConsultaPersist
    {
        private readonly UCarLinkContext _context;

        public ConsultaPersist(UCarLinkContext context)
        {
            _context = context;
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }   

        public async Task<Intencao[]> GetConsultaIntencoesByFiltros(Consulta model)
        {            
            int[] idVendedoresDaLoja = new int[0];
            Vendedor[] vendedores;

            if (model.IdLoja > 0)
            {
                IQueryable<Vendedor> queryVendedor = _context.Vendedores;
                queryVendedor = queryVendedor.AsNoTracking().Where(v => v.LojaIdLoja == model.IdLoja);
                vendedores = await queryVendedor.ToArrayAsync();

                idVendedoresDaLoja = new int[vendedores.Length];
                for (int i = 0; i < vendedores.Length; i++)
                {
                    idVendedoresDaLoja[i] = vendedores[i].IdVendedor;
                }                    
            }

            IQueryable<Intencao> query = _context.Intencoes;
            query = query.AsNoTracking().WhereIf(model.IdLoja > 0, l => idVendedoresDaLoja.Contains(l.VendedorInclusaoIdVendedor))
                                        .WhereIf(model.CompraVenda == 1, l => l.ValorVeiculo >= model.ValorBuscaInicial 
                                                                          && l.ValorVeiculo <= model.ValorBuscaFinal)
                                        .WhereIf(model.DataCadastro != null, l => l.DataCadastro == model.DataCadastro)
                                        .WhereIf(model.DataVencimento != null, l => l.DataVencimento == model.DataVencimento)
                                        .WhereIf(model.IdModelo > 0, l => l.ModeloIdModelo == model.IdModelo)
                                        .WhereIf(model.AnoBuscaInicial > 0, l => l.AnoInicial >= model.AnoBuscaInicial && l.AnoInicial <= model.AnoBuscaFim)                                        
                                        .WhereIf(model.IdTipoVeiculo > 0, l => l.TipoVeiculoIdTipoVeiculo == model.IdTipoVeiculo)
                                        .WhereIf(model.IdTipoPorta > 0, l => l.TipoPortaIdTipoPorta == model.IdTipoPorta)
                                        .WhereIf(model.IdCombustivel > 0, l => l.CombustivelIdCombustivel == model.IdCombustivel)
                                        .WhereIf(model.IdCorVeiculo > 0, l => l.CorVeiculoIdCorVeiculo == model.IdCorVeiculo)
                                        .WhereIf(model.Cambio?.Length > 0, l => l.Cambio.ToUpper().Contains(model.Cambio.ToUpper()))
                                        .WhereIf(model.ArCondicionado?.Length > 0, l => l.ArCondicionado.ToUpper().Contains(model.ArCondicionado.ToUpper()))
                                        .WhereIf(model.VidroEletrico?.Length > 0, l => l.VidroEletrico.ToUpper().Contains(model.VidroEletrico.ToUpper()))
                                        .WhereIf(model.TravasEletricas?.Length > 0, l => l.TravasEletricas.ToUpper().Contains(model.TravasEletricas.ToUpper()))
                                        .WhereIf(model.Alarme?.Length > 0, l => l.Alarme.ToUpper().Contains(model.Alarme.ToUpper()))
                                        .WhereIf(model.Som?.Length > 0, l => l.Som.ToUpper().Contains(model.Som.ToUpper()))
                                        .WhereIf(model.DirecaoEletrica?.Length > 0, l => l.DirecaoEletrica.ToUpper().Contains(model.DirecaoEletrica.ToUpper()))
                                        .WhereIf(model.KmBuscaInicial > 0, l => l.KmInicial >= model.KmBuscaInicial)
                                        .WhereIf(model.KmBuscaFinal > 0, l => l.KmFinal <= model.KmBuscaFinal)
                                        ; 

            return await query.ToArrayAsync();

            /*IQueryable<Intencao> query = _context.Intencoes;
            query = query.AsNoTracking().OrderBy(c => c.DataCadastro).Where(c => c.IdIntencao == IdIntencao);

            return await query.FirstOrDefaultAsync();*/
        }
    }
}