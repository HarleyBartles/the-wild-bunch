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
                        ClientId = config.GetValue<string>("AuthenticationOptions:OIDCOptions:ClientId"),
                        ResponseType = config.GetValue<string>("AuthenticationOptions:OIDCOptions:ResponseType"),
                        Scopes = config.GetValue<string>("AuthenticationOptions:OIDCOptions:Scopes").Split(" ").ToList(),

                        Authority = config.GetValue<string>("AuthenticationOptions:OIDCOptions:Authority"),
                        SilentRedirectURI = config.GetValue<string>("AuthenticationOptions:OIDCOptions:SilentRedirectURI"),
                        AutomaticSilentRenew = config.GetValue<bool>("AuthenticationOptions:OIDCOptions:AutomaticSilentRenew"),
                        FilterProtocolClaims = config.GetValue<bool>("AuthenticationOptions:OIDCOptions:FilterProtocolClaims"),
                        LoadUserInfo = config.GetValue<bool>("AuthenticationOptions:OIDCOptions:LoadUserInfo"),
                        //RevokeAccessTokensOnSignout = config.GetValue<bool>("AuthenticationOptions:OIDCOptions:RevokeAccessTokensOnSignout"),
                        RedirectURI = config.GetValue<string>("AuthenticationOptions:OIDCOptions:RedirectURI"),
                        PostLogoutRedirectURI = config.GetValue<string>("AuthenticationOptions:OIDCOptions:PostLogoutRedirectURI"),
                        //StartURL = config.GetValue<string>("AuthenticationOptions:OIDCOptions:ClientId"),
                        MonitorSession = config.GetValue<bool>("AuthenticationOptions:OIDCOptions:MonitorSession"),
                        //SilentRequestTimeout = config.GetValue<int>("AuthenticationOptions:OIDCOptions:ClientId"),
                        //CheckSessionInterval = config.GetValue<int>("AuthenticationOptions:OIDCOptions:ClientId"),
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
