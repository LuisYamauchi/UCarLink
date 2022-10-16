using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using UCarLink.Application;
using UCarLink.Application.Contratos;
using UCarLink.Persistence;
using UCarLink.Persistence.Contextos;
using UCarLink.Persistence.Contratos;

namespace UCarLink.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<UCarLinkContext>(
                context => context.UseSqlite(Configuration.GetConnectionString("Default"))
            );
            services.AddControllers()
                    .AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddScoped<IClienteService, ClienteService>();            
            services.AddScoped<IGeralPersist, GeralPersist>();
            services.AddScoped<IClientePersist, ClientePersist>();
            services.AddScoped<ILojaService, LojaService>();
            services.AddScoped<ILojaPersist, LojaPersist>();
            services.AddScoped<IVendedorService, VendedorService>();
            services.AddScoped<IVendedorPersist, VendedorPersist>();
            services.AddScoped<IIntencaoService, IntencaoService>();
            services.AddScoped<IIntencaoPersist, IntencaoPersist>();
            services.AddScoped<ICombustivelService, CombustivelService>();
            services.AddScoped<ICombustivelPersist, CombustivelPersist>();
            services.AddScoped<IConfiguracaoService, ConfiguracaoService>();
            services.AddScoped<IConfiguracaoPersist, ConfiguracaoPersist>();
            services.AddScoped<ICorVeiculoService, CorVeiculoService>();
            services.AddScoped<ICorVeiculoPersist, CorVeiculoPersist>();
            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "UCarLink.API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "UCarLink.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(x => x.AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowAnyOrigin());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
