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
                    ValorMaxBusca = table.Column<string>(type: "TEXT", nullable: true),
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
                    LojaIdLoja = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vendedores", x => x.IdVendedor);
                    table.ForeignKey(
                        name: "FK_Vendedores_Lojas_LojaIdLoja",
                        column: x => x.LojaIdLoja,
                        principalTable: "Lojas",
                        principalColumn: "IdLoja",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Modelos",
                columns: table => new
                {
                    IdModelo = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Descricao = table.Column<int>(type: "INTEGER", nullable: false),
                    MontadoraIdMontadora = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modelos", x => x.IdModelo);
                    table.ForeignKey(
                        name: "FK_Modelos_Montadoras_MontadoraIdMontadora",
                        column: x => x.MontadoraIdMontadora,
                        principalTable: "Montadoras",
                        principalColumn: "IdMontadora",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Intencoes",
                columns: table => new
                {
                    IdIntencao = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ClienteIdCliente = table.Column<int>(type: "INTEGER", nullable: true),
                    CompraVenda = table.Column<int>(type: "INTEGER", nullable: false),
                    VendedorInclusaoIdVendedor = table.Column<int>(type: "INTEGER", nullable: true),
                    VendedorNegociacaoIdVendedor = table.Column<int>(type: "INTEGER", nullable: true),
                    ValorInicial = table.Column<decimal>(type: "TEXT", nullable: false),
                    ValorFinal = table.Column<decimal>(type: "TEXT", nullable: false),
                    ValorVeiculo = table.Column<decimal>(type: "TEXT", nullable: false),
                    DataCadastro = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DataVencimento = table.Column<DateTime>(type: "TEXT", nullable: true),
                    ModeloIdModelo = table.Column<int>(type: "INTEGER", nullable: true),
                    AnoInicial = table.Column<int>(type: "INTEGER", nullable: true),
                    AnoFinal = table.Column<int>(type: "INTEGER", nullable: true),
                    TipoVeiculoIdTipoVeiculo = table.Column<int>(type: "INTEGER", nullable: true),
                    TipoPortaIdTipoPorta = table.Column<int>(type: "INTEGER", nullable: true),
                    CombustivelIdCombustivel = table.Column<int>(type: "INTEGER", nullable: true),
                    CorVeiculoIdCorVeiculo = table.Column<int>(type: "INTEGER", nullable: true),
                    Cambio = table.Column<string>(type: "TEXT", nullable: true),
                    ArCondicionado = table.Column<string>(type: "TEXT", nullable: true),
                    VidroEletrico = table.Column<string>(type: "TEXT", nullable: true),
                    TravasEletricas = table.Column<string>(type: "TEXT", nullable: true),
                    Alarme = table.Column<string>(type: "TEXT", nullable: true),
                    Som = table.Column<string>(type: "TEXT", nullable: true),
                    DirecaoEletrica = table.Column<string>(type: "TEXT", nullable: true),
                    KmInicial = table.Column<decimal>(type: "TEXT", nullable: false),
                    KmFinal = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Intencoes", x => x.IdIntencao);
                    table.ForeignKey(
                        name: "FK_Intencoes_Clientes_ClienteIdCliente",
                        column: x => x.ClienteIdCliente,
                        principalTable: "Clientes",
                        principalColumn: "IdCliente",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Intencoes_Combustiveis_CombustivelIdCombustivel",
                        column: x => x.CombustivelIdCombustivel,
                        principalTable: "Combustiveis",
                        principalColumn: "IdCombustivel",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Intencoes_CoresVeiculo_CorVeiculoIdCorVeiculo",
                        column: x => x.CorVeiculoIdCorVeiculo,
                        principalTable: "CoresVeiculo",
                        principalColumn: "IdCorVeiculo",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Intencoes_Modelos_ModeloIdModelo",
                        column: x => x.ModeloIdModelo,
                        principalTable: "Modelos",
                        principalColumn: "IdModelo",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Intencoes_TiposPortas_TipoPortaIdTipoPorta",
                        column: x => x.TipoPortaIdTipoPorta,
                        principalTable: "TiposPortas",
                        principalColumn: "IdTipoPorta",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Intencoes_TiposVeiculo_TipoVeiculoIdTipoVeiculo",
                        column: x => x.TipoVeiculoIdTipoVeiculo,
                        principalTable: "TiposVeiculo",
                        principalColumn: "IdTipoVeiculo",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Intencoes_Vendedores_VendedorInclusaoIdVendedor",
                        column: x => x.VendedorInclusaoIdVendedor,
                        principalTable: "Vendedores",
                        principalColumn: "IdVendedor",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Intencoes_Vendedores_VendedorNegociacaoIdVendedor",
                        column: x => x.VendedorNegociacaoIdVendedor,
                        principalTable: "Vendedores",
                        principalColumn: "IdVendedor",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Intencoes_ClienteIdCliente",
                table: "Intencoes",
                column: "ClienteIdCliente");

            migrationBuilder.CreateIndex(
                name: "IX_Intencoes_CombustivelIdCombustivel",
                table: "Intencoes",
                column: "CombustivelIdCombustivel");

            migrationBuilder.CreateIndex(
                name: "IX_Intencoes_CorVeiculoIdCorVeiculo",
                table: "Intencoes",
                column: "CorVeiculoIdCorVeiculo");

            migrationBuilder.CreateIndex(
                name: "IX_Intencoes_ModeloIdModelo",
                table: "Intencoes",
                column: "ModeloIdModelo");

            migrationBuilder.CreateIndex(
                name: "IX_Intencoes_TipoPortaIdTipoPorta",
                table: "Intencoes",
                column: "TipoPortaIdTipoPorta");

            migrationBuilder.CreateIndex(
                name: "IX_Intencoes_TipoVeiculoIdTipoVeiculo",
                table: "Intencoes",
                column: "TipoVeiculoIdTipoVeiculo");

            migrationBuilder.CreateIndex(
                name: "IX_Intencoes_VendedorInclusaoIdVendedor",
                table: "Intencoes",
                column: "VendedorInclusaoIdVendedor");

            migrationBuilder.CreateIndex(
                name: "IX_Intencoes_VendedorNegociacaoIdVendedor",
                table: "Intencoes",
                column: "VendedorNegociacaoIdVendedor");

            migrationBuilder.CreateIndex(
                name: "IX_Modelos_MontadoraIdMontadora",
                table: "Modelos",
                column: "MontadoraIdMontadora");

            migrationBuilder.CreateIndex(
                name: "IX_Vendedores_LojaIdLoja",
                table: "Vendedores",
                column: "LojaIdLoja");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Configuracoes");

            migrationBuilder.DropTable(
                name: "Intencoes");

            migrationBuilder.DropTable(
                name: "Clientes");

            migrationBuilder.DropTable(
                name: "Combustiveis");

            migrationBuilder.DropTable(
                name: "CoresVeiculo");

            migrationBuilder.DropTable(
                name: "Modelos");

            migrationBuilder.DropTable(
                name: "TiposPortas");

            migrationBuilder.DropTable(
                name: "TiposVeiculo");

            migrationBuilder.DropTable(
                name: "Vendedores");

            migrationBuilder.DropTable(
                name: "Montadoras");

            migrationBuilder.DropTable(
                name: "Lojas");
        }
    }
}
