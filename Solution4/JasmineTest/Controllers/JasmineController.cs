using System;
using System.Web.Mvc;

namespace JasmineTest.Controllers
{
    public class JasmineController : Controller
    {
        public ViewResult Run()
        {
            return View("SpecRunner");
        }
    }
}
