using System;
using System.Web.Mvc;

namespace EmployementApplication.Controllers
{
    public class JasmineController : Controller
    {
        public ViewResult Run()
        {
            return View("SpecRunner");
        }
    }
}
