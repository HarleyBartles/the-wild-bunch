using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheWildBunch.Interfaces
{
    public interface IApplicationSettings
    {
        string ApplicationName { get; }
        IDictionary<string, string> ConnectionStrings { get; }
        string GetConnectionString(string connectionName);
    }
}
