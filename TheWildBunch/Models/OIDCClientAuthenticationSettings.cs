using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheWildBunch.Models
{
    public class OIDCClientAuthenticationSettings
    {
        public string ClientId { get; set; }
        public string ResponseType { get; set; }
        public string Scope
        {
            get
            {
                return string.Join(' ', Scopes ?? new List<string>());
            }
        }

        [JsonIgnore]
        public List<string> Scopes { get; set; }

        public string Authority { get; set; }
        public string SilentRedirectURI { get; set; }
        public bool AutomaticSilentRenew { get; set; }
        public bool FilterProtocolClaims { get; set; }
        public bool LoadUserInfo { get; set; }
        public bool RevokeAccessTokensOnSignout { get; set; }
        public string RedirectURI { get; set; }
        public string PostLogoutRedirectURI { get; set; }
        public string StartURL { get; set; }
        public bool MonitorSession { get; set; }
        public int SilentRequestTimeout { get; set; }
        public int CheckSessionInterval { get; set; }

    }
}
