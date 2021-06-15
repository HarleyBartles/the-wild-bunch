using IdentityModel.AspNetCore.OAuth2Introspection;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.IdentityModel.Tokens.Jwt;
using TheWildBunch.Data;
using TheWildBunch.Extensions;
using TheWildBunch.Models;

namespace TheWildBunch
{
    public class Startup
    {
        private ApplicationSettings _appSettings;
        private readonly IHostingEnvironment _environment;
        private readonly ILogger<Startup> _logger;
        public Startup(IHostingEnvironment environment, ILoggerFactory loggerFactory)
        {
            _environment = environment;
            _logger = loggerFactory.CreateLogger<Startup>();
        }
        
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.Json");

            _appSettings = services.AddApplicationSettings();
            
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(_appSettings.GetConnectionString("DefaultConnection")));

            _logger.LogInformation("Adding authorization services");


            AddAuthorizationServices(services);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env
            //, ILoggingBuilder loggerBuilder
            )
        {
            //loggerBuilder.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new Microsoft.AspNetCore.SpaServices.Webpack.WebpackDevMiddlewareOptions
                {
                    ConfigFile = "BuildConfig/webpack.config.js",
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            ConfigureAuthentication(app);
            
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });           
        }

        private void AddAuthorizationServices(IServiceCollection services)
        {
            var authOptions = _appSettings.AuthenticationOptions;

            services.AddDefaultIdentity<IdentityUser>()
                .AddEntityFrameworkStores<ApplicationDbContext>();
            
            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(options =>
                {
                    options.Authority = authOptions.AuthenticationServerUrl;
                    options.RequireHttpsMetadata = true;

                    options.ApiName = authOptions.ApiName;
                    options.ApiSecret = authOptions.ApiSecret;

                    options.RoleClaimType = "role";
                    options.NameClaimType = "name";
                    options.SaveToken = true;

                    options.TokenRetriever = (request) =>
                    {
                        var fromHeader = TokenRetrieval.FromAuthorizationHeader();
                        var fromQueryString = TokenRetrieval.FromQueryString();

                        string accessToken = fromHeader.Invoke(request);

                        if (string.IsNullOrEmpty(accessToken))
                            accessToken = fromQueryString.Invoke(request);

                        return accessToken;

                    };
                });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", corsPolicy =>
                {
                    corsPolicy.WithOrigins("https://localhost:44396/")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });
        }

        public void ConfigureAuthentication(IApplicationBuilder app)
        {
            app.UseCookiePolicy(new CookiePolicyOptions
            {
                HttpOnly = _appSettings.AuthenticationOptions.HttpOnlyPolicy,
                Secure = _appSettings.AuthenticationOptions.SecurePolicy,
                MinimumSameSitePolicy = _appSettings.AuthenticationOptions.SameSiteMode,
            });

            app.UseCors("CorsPolicy");

            app.UseAuthentication();
        }
    }
}
