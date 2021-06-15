using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheWildBunch.Extensions;
using TheWildBunch.Interfaces;

namespace TheWildBunch.Models
{
    public class ApplicationSettings : IApplicationSettings
    {
        internal IEnumerable<AppSetting> _connectionStrings { get; set; } = new List<AppSetting>();

        public IDictionary<string, string> ConnectionStrings => _connectionStrings?.ToDictionary();
        public string ApplicationName => "TheWildBunch";

        public ClientAuthOptions AuthenticationOptions { get; internal set; }

        public string GetConnectionString(string connectionName) => _connectionStrings
            .FirstOrDefault(c => c.AppSettingKey == connectionName)?.AppSettingValue;
    }

    public class ClientAuthOptions
    {
        public string AuthenticationServerUrl { get; set; }
        public bool RequireHttpsMetadata { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public CookieSecurePolicy SecurePolicy { get; set; }
        public HttpOnlyPolicy HttpOnlyPolicy { get; set; }
        public SameSiteMode SameSiteMode { get; set; }
        public string ApiName { get; set; }
        public string ApiSecret { get; set; }
        public OIDCClientAuthenticationSettings OIDCOptions { get; set; }
    }
}
