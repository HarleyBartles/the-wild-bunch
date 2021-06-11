using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TheWildBunch.Models;
using TheWildBunch.ViewModels;

namespace TheWildBunch.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewData["AppSettings"] = new ClientSettingViewModel
            {
                ApplicationVersion = "1.0.0"
            };
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
