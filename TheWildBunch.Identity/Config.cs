using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace TheWildBunch.Identity
{
    public static class Config
    {
        // test users
        public static List<TestUser> GetUsers()
        {
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "d5fcb17f-1141-47cf-bf71-6077c9886245",
                    Username = "User1",
                    Password = "u123",
                    Claims = new List<Claim>
                    {
                        new Claim("given_name", "John"),
                        new Claim("family_name", "Doe"),
                        new Claim("role", "Admin"),
                    }
                },
                new TestUser
                {
                    SubjectId = "07f1b86d-5ee0-4a7c-8cce-f3335fa574d9",
                    Username = "User2",
                    Password = "u456",
                    Claims = new List<Claim>
                    {
                        new Claim("given_name", "Jane"),
                        new Claim("family_name", "Dae"),
                        new Claim("role", "User"),
                    }
                }
            };
            
            
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResource("roles", "Your role(s)", new List<string>(){ "role"})
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientName = "TheWildBunch",
                    ClientId = "thewildbunchclient",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    RedirectUris = new List<string>()
                    {
                        "https://localhost:44396/callback"
                    },
                    PostLogoutRedirectUris = new List<string>()
                    {
                        "https://localhost:44396/"
                    },
                    AllowedScopes = 
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "roles"
                    },
                    ClientSecrets = 
                    {
                        new Secret("thewildbunchsecret".Sha256())
                    },
                    AllowedCorsOrigins = new List<string>()
                    {
                        "https://localhost:44396/"
                    },
                    AllowAccessTokensViaBrowser = true
                }
            };
        }
    }
}
