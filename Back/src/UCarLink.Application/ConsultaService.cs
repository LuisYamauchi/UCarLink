using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UCarLink.Application.Contratos;
using UCarLink.Application.Dtos;
using UCarLink.Domain;
using UCarLink.Persistence.Contratos;

namespace UCarLink.Application
{
    public class ConsultaService : IConsultaService
    {        
        private readonly IConsultaPersist _consultaPersist;
        private readonly IClienteService _clienteService;
        private readonly IVendedorService _vendedorService;
        private readonly IModeloService _modeloService;
        private readonly ITipoVeiculoService _tipoVeiculoService;
        private readonly ITipoPortaService _tipoPortaService;
        private readonly ICombustivelService _combustivelService;
        private readonly ICorVeiculoService _corVeiculoService;

        public ConsultaService(
            IConsultaPersist consultaPersist,
            IClienteService clienteService,
            IVendedorService vendedorService,
            IModeloService modeloService,
            ITipoVeiculoService tipoVeiculoService,
            ITipoPortaService tipoPortaService,
            ICombustivelService combustivelService,
            ICorVeiculoService corVeiculoService)
        {
            this._consultaPersist = consultaPersist;
            this._clienteService = clienteService;
            this._vendedorService = vendedorService;
            this._modeloService = modeloService;
            this._tipoVeiculoService = tipoVeiculoService;
            this._tipoPortaService = tipoPortaService;
            this._combustivelService = combustivelService;
            this._corVeiculoService = corVeiculoService;
        }   

        public async Task<Intencao[]> GetConsultaIntencoesByFiltros(Consulta model)
        {
           try
           {
                var intencoes = await _consultaPersist.GetConsultaIntencoesByFiltros(model);
                if(!intencoes.Any()) return null;

                return intencoes;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }

        
        public async Task<IList<IntencaoDetalhes>> GetConsultaIntencoesDetalhesByFiltros(Consulta model)
        {
           try
           {
                var intencoes = await _consultaPersist.GetConsultaIntencoesByFiltros(model);
                if(!intencoes.Any()) return null;

                List<IntencaoDetalhes> result = new List<IntencaoDetalhes>();

                foreach (var intencao in intencoes)
                {
                    IntencaoDetalhes intencaoDetalhes = new IntencaoDetalhes()
                    {
                        IdIntencao = intencao.IdIntencao,
                        ClienteIdCliente = intencao.ClienteIdCliente,
                        CompraVenda = intencao.CompraVenda,
                        VendedorInclusaoIdVendedor = intencao.VendedorInclusaoIdVendedor,
                        VendedorNegociacaoIdVendedor = intencao.VendedorNegociacaoIdVendedor,
                        ValorInicial = intencao.ValorInicial,
                        ValorFinal = intencao.ValorFinal,
                        ValorVeiculo = intencao.ValorVeiculo,
                        DataCadastro = intencao.DataCadastro,
                        DataVencimento = intencao.DataVencimento,
                        ModeloIdModelo = intencao.ModeloIdModelo,
                        AnoInicial = intencao.AnoInicial,
                        TipoVeiculoIdTipoVeiculo = intencao.TipoVeiculoIdTipoVeiculo,
                        TipoPortaIdTipoPorta = intencao.TipoPortaIdTipoPorta,
                        CombustivelIdCombustivel = intencao.CombustivelIdCombustivel,
                        CorVeiculoIdCorVeiculo = intencao.CorVeiculoIdCorVeiculo,
                        Cambio = intencao.Cambio,
                        ArCondicionado = intencao.ArCondicionado,
                        VidroEletrico = intencao.VidroEletrico,
                        TravasEletricas = intencao.TravasEletricas,
                        Alarme = intencao.Alarme,
                        Som = intencao.Som,
                        DirecaoEletrica = intencao.DirecaoEletrica,
                        KmInicial = intencao.KmInicial,
                        KmFinal = intencao.KmFinal
                    };
                    result.Add(intencaoDetalhes);

                    var cliente = await _clienteService.GetClientesByIdAsync(intencao.ClienteIdCliente);
                    intencaoDetalhes.ClienteNome = cliente.Nome;

                    var vendedor = await _vendedorService.GetVendedoresByIdAsync(intencao.VendedorInclusaoIdVendedor);
                    intencaoDetalhes.VendedorInclusaoNome = vendedor.Nome;

                    vendedor = await _vendedorService.GetVendedoresByIdAsync(intencao.VendedorNegociacaoIdVendedor);
                    intencaoDetalhes.VendedorNegociacaoNome = vendedor.Nome;

                    var modelo = await _modeloService.GetModelosByIdAsync(intencao.ModeloIdModelo);
                    intencaoDetalhes.ModeloDescricao = modelo.Descricao;

                    var tipoVeiculo = await _tipoVeiculoService.GetTiposVeiculoByIdAsync(intencao.TipoVeiculoIdTipoVeiculo);
                    intencaoDetalhes.TipoVeiculoDescricao = tipoVeiculo.Descricao;

                    var tipoPorta = await _tipoPortaService.GetTiposPortaByIdAsync(intencao.TipoPortaIdTipoPorta);
                    intencaoDetalhes.TipoPortaDescricao = tipoPorta.Descricao;

                    var combustivel = await _combustivelService.GetCombustiveisByIdAsync(intencao.CombustivelIdCombustivel);
                    intencaoDetalhes.CombustivelDescricao = combustivel.Descricao;

                    var corVeiculo = await _corVeiculoService.GetCoresVeiculoByIdAsync(intencao.CorVeiculoIdCorVeiculo);
                    intencaoDetalhes.CorVeiculoDescricao = corVeiculo.Descricao;
                }

                return result;
           }
           catch (System.Exception ex)
           {
                throw new Exception(ex.Message);
           }
        }
    }
}