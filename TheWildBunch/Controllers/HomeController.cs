using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TheWildBunch.Interfaces;
using TheWildBunch.Models;
using TheWildBunch.ViewModels;

namespace TheWildBunch.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationSettings _applicationSettings;
        public HomeController(ApplicationSettings appSettings)
        {
            _applicationSettings = appSettings;
        }

        [AllowAnonymous]
        public IActionResult Index()
        {
            ViewData["AppSettings"] = new ClientSettingViewModel(_applicationSettings);

            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
