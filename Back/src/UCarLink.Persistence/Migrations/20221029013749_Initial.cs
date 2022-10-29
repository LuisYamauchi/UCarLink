using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UCarLink.Persistence.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clientes",
                columns: table => new
                {
                    IdCliente = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: false),
                    Telefone = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clientes", x => x.IdCliente);
                });

            migrationBuilder.CreateTable(
                name: "Combustiveis",
                columns: table => new
                {
                    IdCombustivel = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Descricao = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Combustiveis", x => x.IdCombustivel);
                });

            migrationBuilder.CreateTable(
                name: "Configuracoes",
                columns: table => new
                {
                    IdConfiguracao = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    QtdeDiasValidadePadrao = table.Column<int>(type: "INTEGER", nullable: false),
                    ValorMinBusca = table.Column<decimal>(type: "TEXT", nullable: false),
                    ValorMaxBusca = table.Column<decimal>(type: "TEXT", nullable: false),
                    PorcentagemComissao = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Configuracoes", x => x.IdConfiguracao);
                });

            migrationBuilder.CreateTable(
                name: "CoresVeiculo",
                columns: table => new
                {
                    IdCorVeiculo = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Descricao = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoresVeiculo", x => x.IdCorVeiculo);
                });

            migrationBuilder.CreateTable(
                name: "Intencoes",
                columns: table => new
                {
                    IdIntencao = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ClienteIdCliente = table.Column<int>(type: "INTEGER", nullable: false),
                    CompraVenda = table.Column<int>(type: "INTEGER", nullable: false),
                    VendedorInclusaoIdVendedor = table.Column<int>(type: "INTEGER", nullable: false),
                    VendedorNegociacaoIdVendedor = table.Column<int>(type: "INTEGER", nullable: false),
                    ValorInicial = table.Column<decimal>(type: "TEXT", nullable: false),
                    ValorFinal = table.Column<decimal>(type: "TEXT", nullable: false),
                    ValorVeiculo = table.Column<decimal>(type: "TEXT", nullable: false),
                    DataCadastro = table.Column<DateTime>(type: "TEXT", nullable: true),
                    DataVencimento = table.Column<DateTime>(type: "TEXT", nullable: true),
                    ModeloIdModelo = table.Column<int>(type: "INTEGER", nullable: false),
                    AnoInicial = table.Column<int>(type: "INTEGER", nullable: true),
                    TipoVeiculoIdTipoVeiculo = table.Column<int>(type: "INTEGER", nullable: false),
                    TipoPortaIdTipoPorta = table.Column<int>(type: "INTEGER", nullable: false),
                    CombustivelIdCombustivel = table.Column<int>(type: "INTEGER", nullable: false),
                    CorVeiculoIdCorVeiculo = table.Column<int>(type: "INTEGER", nullable: false),
                    Cambio = table.Column<string>(type: "TEXT", nullable: true),
                    ArCondicionado = table.Column<string>(type: "TEXT", nullable: true),
                    VidroEletrico = table.Column<string>(type: "TEXT", nullable: true),
                    TravasEletricas = table.Column<string>(type: "TEXT", nullable: true),
                    Alarme = table.Column<string>(type: "TEXT", nullable: true),
                    Som = table.Column<string>(type: "TEXT", nullable: true),
                    DirecaoEletrica = table.Column<string>(type: "TEXT", nullable: true),
                    KmInicial = table.Column<decimal>(type: "TEXT", nullable: false),
                    KmFinal = table.Column<decimal>(type: "TEXT", nullable: false),
                    KmAtual = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Intencoes", x => x.IdIntencao);
                });

            migrationBuilder.CreateTable(
                name: "Lojas",
                columns: table => new
                {
                    IdLoja = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: false),
                    CNPJ = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lojas", x => x.IdLoja);
                });

            migrationBuilder.CreateTable(
                name: "Modelos",
                columns: table => new
                {
                    IdModelo = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Descricao = table.Column<string>(type: "TEXT", nullable: false),
                    MontadoraIdMontadora = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modelos", x => x.IdModelo);
                });

            migrationBuilder.CreateTable(
                name: "Montadoras",
                columns: table => new
                {
                    IdMontadora = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Descricao = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Montadoras", x => x.IdMontadora);
                });

            migrationBuilder.CreateTable(
                name: "TiposPortas",
                columns: table => new
                {
                    IdTipoPorta = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Descricao = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposPortas", x => x.IdTipoPorta);
                });

            migrationBuilder.CreateTable(
                name: "TiposVeiculo",
                columns: table => new
                {
                    IdTipoVeiculo = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Descricao = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposVeiculo", x => x.IdTipoVeiculo);
                });

            migrationBuilder.CreateTable(
                name: "Vendedores",
                columns: table => new
                {
                    IdVendedor = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false),
                    Nome = table.Column<string>(type: "TEXT", nullable: false),
                    Usuario = table.Column<string>(type: "TEXT", nullable: false),
                    LojaIdLoja = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vendedores", x => x.IdVendedor);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Clientes");

            migrationBuilder.DropTable(
                name: "Combustiveis");

            migrationBuilder.DropTable(
                name: "Configuracoes");

            migrationBuilder.DropTable(
                name: "CoresVeiculo");

            migrationBuilder.DropTable(
                name: "Intencoes");

            migrationBuilder.DropTable(
                name: "Lojas");

            migrationBuilder.DropTable(
                name: "Modelos");

            migrationBuilder.DropTable(
                name: "Montadoras");

            migrationBuilder.DropTable(
                name: "TiposPortas");

            migrationBuilder.DropTable(
                name: "TiposVeiculo");

            migrationBuilder.DropTable(
                name: "Vendedores");
        }
    }
}
