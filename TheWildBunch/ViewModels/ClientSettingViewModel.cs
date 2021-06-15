using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheWildBunch.Interfaces;
using TheWildBunch.Models;

namespace TheWildBunch.ViewModels
{
    public class ClientSettingViewModel
    {
        public ClientSettingViewModel(ApplicationSettings appSettings)
        {
            AuthSettings = appSettings.AuthenticationOptions.OIDCOptions;
        }

        public OIDCClientAuthenticationSettings AuthSettings { get; set; }
        public string ApplicationVersion { get; set; }
        
    }

}