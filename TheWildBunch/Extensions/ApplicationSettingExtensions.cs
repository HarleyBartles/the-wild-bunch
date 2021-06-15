using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheWildBunch.Interfaces;
using TheWildBunch.Models;

namespace TheWildBunch.Extensions
{
    public static class ApplicationSettingExtensions
    {
        public static ApplicationSettings AddApplicationSettings(this IServiceCollection services)
        {
            IConfigurationRoot config = new ConfigurationBuilder()
                .AddJsonFile("appSettings.json")
                .Build();

            var appSettings = new ApplicationSettings
            {
                _connectionStrings = new List<AppSetting>{
                    new AppSetting
                    {
                        AppSettingKey = "DefaultConnection",
                        AppSettingValue = config.GetConnectionString("DefaultConnection")
                    }
                },
                AuthenticationOptions = new ClientAuthOptions 
                {
                    AuthenticationServerUrl = config.GetValue<string>("AuthenticationOptions:AuthenticationServerUrl"),
                    ApiName = config.GetValue<string>("AuthenticationOptions:ApiName"),
                    ApiSecret = config.GetValue<string>("AuthenticationOptions:ApiSecret"),
                    ClientId = config.GetValue<string>("AuthenticationOptions:ClientId"),
                    ClientSecret = config.GetValue<string>("AuthenticationOptions:ClientSecret"),

                    RequireHttpsMetadata = config.GetValue<bool>("AuthenticationOptions:RequireHttpsMetadata"),

                    SecurePolicy = (CookieSecurePolicy)config.GetValue<int>("AuthenticationOptions:SecurePolicy"),
                    HttpOnlyPolicy = (HttpOnlyPolicy)config.GetValue<int>("AuthenticationOptions:HttpOnlyPolicy"),
                    SameSiteMode = (SameSiteMode)config.GetValue<int>("AuthenticationOptions:SameSiteMode"),

                    OIDCOptions = new OIDCClientAuthenticationSettings
                    {
                        ClientId = config.GetValue<string>("OIDCOptions:ClientId"),
                        ResponseType = config.GetValue<string>("OIDCOptions:ResponseType"),
                        Scopes = config.GetValue<string>("OIDCOptions:Scopes").Split(" ").ToList(),
                        
                        Authority = config.GetValue<string>("OIDCOptions:Authority"),
                        SilentRedirectURI = config.GetValue<string>("OIDCOptions:SilentRedirectURI"),
                        AutomaticSilentRenew = config.GetValue<bool>("OIDCOptions:AutomaticSilentRenew"),
                        FilterProtocolClaims = config.GetValue<bool>("OIDCOptions:FilterProtocolClaims"),
                        LoadUserInfo = config.GetValue<bool>("OIDCOptions:LoadUserInfo"),
                        RevokeAccessTokensOnSignout = config.GetValue<bool>("OIDCOptions:RevokeAccessTokensOnSignout"),
                        RedirectURI = config.GetValue<string>("OIDCOptions:RedirectURI"),
                        PostLogoutRedirectURI = config.GetValue<string>("OIDCOptions:PostLogoutRedirectURI"),
                        StartURL = config.GetValue<string>("OIDCOptions:ClientId"),
                        MonitorSession = config.GetValue<bool>("OIDCOptions:MonitorSession"),
                        SilentRequestTimeout = config.GetValue<int>("OIDCOptions:SilentRequestTimeout"),
                        CheckSessionInterval = config.GetValue<int>("OIDCOptions:CheckSessionInterval"),
                    }

                }
                
            };

            services.AddSingleton(typeof(ApplicationSettings), appSettings);

            return appSettings;
        }

        public static IDictionary<string, string> ToDictionary(this IEnumerable<AppSetting> settings)
        {
            var dict = new Dictionary<string, string>();

            foreach (var s in settings)
            {
                dict.Add(s.AppSettingKey, s.AppSettingValue);
            }

            return dict;
        }
    }
}
