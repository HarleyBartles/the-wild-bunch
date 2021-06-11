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


        public string GetConnectionString(string connectionName) => _connectionStrings
            .FirstOrDefault(c => c.AppSettingKey == connectionName)?.AppSettingValue;
    }
}
