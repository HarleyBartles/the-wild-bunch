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
                }
            };

            //config.Bind("Logging", appSettings._appSettings.Last());
            //config.Bind("AllowedHosts", appSettings._appSettings.Last());

            services.AddSingleton(typeof(IApplicationSettings), appSettings);

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
