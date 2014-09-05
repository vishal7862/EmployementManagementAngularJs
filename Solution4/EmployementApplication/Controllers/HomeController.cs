using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.WebPages;
using EmployementApplication.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Newtonsoft.Json;
using WebGrease.Css.Ast.Selectors;
using System.Net.Http;
using System.Threading;
using System.Net.Mail;
using System.Net;
using Microsoft.AspNet.Identity.EntityFramework;

namespace EmployementApplication.Controllers
{
    [HandleError]
    //[AllowAnonymous]

    public class HomeController : Controller
    {
        private readonly UserManager<AppUser> userManager;
        IEmployeesRepository _employeesRepository;
        IDepartmentsRepository _departmentsRepository;


        public HomeController()
            : this(new EFEmployeesRepository(), new EFDepartmentsRepository(), Startup.UserManagerFactory.Invoke())
        {
            //_employeesRepository = new EFEmployeesRepository();
            //_departmentsRepository = new EFDepartmentsRepository();

        }
        public HomeController(IEmployeesRepository employeesRepository, IDepartmentsRepository departmentsRepository, UserManager<AppUser> userManager)
        {
            _employeesRepository = employeesRepository;
            _departmentsRepository = departmentsRepository;
            this.userManager = userManager;
        }


        [Authorize(Roles = "Admin,User")]
        public ActionResult Index()
        {
            return View();
        }
        public ViewResult Index1()
        {
            var usr = User.Identity.GetUserId();
            AppUser user = userManager.FindById(usr);
            if (user != null && user.Email != "vishal@gmail.com")
            {
                Employees emp1 = _employeesRepository.GetAllEmployees().Where(e => e.AppId == usr).First();
                ViewBag.Emp = emp1;

                IEnumerable<string> depts = from de in _departmentsRepository.GetAllDepartments() from e in de.Employs where e.Id == emp1.Id select de.Name;

                string sum = "";
                foreach (string d in depts)
                {
                    if (depts.Count() < 2)
                    {
                        sum = sum + d;
                    }
                    else
                    {
                        sum = d + " " + sum;
                    }
                }
                ViewBag.dept = sum;
            }
            return View();

        }

        [HttpGet]
        public PartialViewResult EmployeeUser()
        {
            return PartialView("EmployeeUser");
        }


        public ActionResult Settings()
        {
            var usr = User.Identity.GetUserId();
            //    AppUser user=await userManager.FindById(usr);
            Employees emp1 = _employeesRepository.GetAllEmployees().Where(e => e.AppId == usr).First();
            var name1 = emp1.Name;
            ViewBag.Name = name1;

            return View();
        }


        [HttpGet]

        public ActionResult LogIn()
        {
            return View();
        }

        [HttpPost]

        public async Task<ActionResult> LogIn(LogInModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            var user = await userManager.FindAsync(model.Email, model.Password);


            if (user != null)
            {
                var identity = await userManager.CreateIdentityAsync(
                    user, DefaultAuthenticationTypes.ApplicationCookie);
                if (user.UserName == "vishal@gmail.com")
                {
                    GetAuthenticationManager().SignIn(identity);

                    // return Redirect("http://10.1.81.226:1043/Home/Index");
                    return Redirect("/#Employees");
                }
                else
                {
                    if (user.EmailConfirmed == true)
                    {
                        GetAuthenticationManager().SignIn(identity);

                        // return Redirect("http://10.1.81.226:1043/Home/Index");
                        return RedirectToAction("Index1", "Home");
                    }
                    else
                    {
                        ModelState.AddModelError("", "please confirm your email");
                        return View();
                    }

                }
            }



            ModelState.AddModelError("", "Invalid email or password");
            return View();

        }


        public async Task<ActionResult> Logout(LogInModel model)
        {
            await SignOut();
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]

        public PartialViewResult Register()
        {
            return PartialView("register");
        }

        [HttpPost]
        public async Task<JsonResult> ChangePsw(string OldPassword, string NewPassword)
        {

            var usrId = User.Identity.GetUserId();


            AppUser usr1 = await userManager.FindByIdAsync(usrId);
            //  AppUser xx = await userManager.PasswordValidator.ValidateAsync(OldPassword);
            AppUser usr = await userManager.FindAsync(usr1.Email, OldPassword);

            if (usr != null)
            {

                var x = await userManager.ChangePasswordAsync(usrId, OldPassword, NewPassword);
                await userManager.UpdateAsync(usr);
                string success = "Pass";
                string success1 = JsonConvert.SerializeObject(success);
                return Json(success1);

            }
            //var err= ModelState.AddModelError("", "Please pass Correct Old Password");
            string err = "Please pass Correct Old Password";
            string err1 = JsonConvert.SerializeObject(err);
            return Json(err1);
        }

        [HttpGet]
        [OverRidingAuthorizationAttribute]
        public JsonResult ChangeProfileGet()
        {
            var x = User.Identity.GetUserId();

            Employees emp = _employeesRepository.GetAllEmployees().Where(e => e.AppId == x).First();

            //   var emp = from em in _employeesRepository.GetAllEmployees() where em.AppId == x select em.Name;
            string res = JsonConvert.SerializeObject(emp, Formatting.Indented,
                                                                                       new JsonSerializerSettings
                                                                                       {
                                                                                           PreserveReferencesHandling = PreserveReferencesHandling.Objects
                                                                                       });
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<JsonResult> ChangeProfile(string Name)
        {
            var x = User.Identity.GetUserId();
            Employees emp = _employeesRepository.GetAllEmployees().Single(e => e.AppId == x);
            emp.Name = Name;
            _employeesRepository.Edit(emp);

            return Json("");
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<JsonResult> Register(RegisterModel model)
        {
            string res = "";
            Departments dept = null;



            //  Employees em = _employeesRepository.GetAllEmployees().Single(e => e.Id == emp.Id);

            if (!ModelState.IsValid)
            {

                return Json(res);
            }


            //  res = JsonConvert.SerializeObject(emp);
            var user = new AppUser
            {
                UserName = model.Email,
                Email = model.Email,

            };
            // display();
            var result = await userManager.CreateAsync(user, model.Password);

            var rol = await userManager.AddToRoleAsync(user.Id, "User");

            if (result.Succeeded)
            {
                Employees emp = new Employees();
                emp.Name = model.Name;
                emp.AppId = user.Id;
                //  _employeesRepository.chkins(user);
                foreach (string id in model.DeptsValue)
                {
                    _departmentsRepository.addemptodept(Convert.ToInt32(id), emp);

                }

                var code = await userManager.GenerateEmailConfirmationTokenAsync(user.Id);

                //   var callbackUrl = Url.Action("ConfirmEmail", "Home", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);
                // var callbackUrl=
                var chk = "hello";

                string str = "Please confirm your account by clicking this link: <a href=http://localhost:1612/#/ConfirmEmail/" + user.Id + "/" + code + "'>link</a>" + " your Email-Id:" + model.Email + "& password:" + model.Password;
                // string str = "Please confirm your account by clicking this link: <a href='http://localhost:1612/#/ConfirmEmail/userId='>link</a><div>" + " your Email-Id:" + model.Email + "& password:" + model.Password;
                //string str = "Please confirm your account by clicking this link: <a href=http://localhost:1612/#/ConfirmEmail'>link</a>" + " your Email-Id:" + model.Email + "& password:" + model.Password;
                //await userManager.SendEmailAsync(user.Id, "Confirm your account", "Please confirm your account by clicking this link");
                sendMail(user.Email, str);
                // await SignIn(user);
                //return Redirect("http://10.1.81.226:1043/Home/Index");
                EmployeeApp empApp = new EmployeeApp();
                empApp.Id = emp.Id;
                empApp.Name = emp.Name;
                empApp.Email = user.Email;
                empApp.DeptName = emp.Department.Select(d => d.Name).ToList();
                return Json(empApp);
            }

            return Json(res);
        }



        [HttpGet]
        public async Task<JsonResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return Json("");
            }
            var result = await userManager.ConfirmEmailAsync(userId, code);

            return Json("ConfirmEmail");
        }



        public void sendMail(string to, string code)
        {
            try
            {

                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
                smtpClient.EnableSsl = true;
                smtpClient.Timeout = 10000;
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential("vishal.kumarmitra786@gmail.com", "vis9033109704chi");
                MailMessage msg = new MailMessage();
                msg.From = new MailAddress("vishal.kumarmitra786@gmail.com");
                msg.To.Add(to);
                msg.Subject = "Email Confirmation";
                msg.IsBodyHtml = true;
                msg.Body = code;
                smtpClient.Send(msg);
            }
            catch (Exception e) { }
        }

        public void display()
        {
            Response.Write("hello");
        }
        private async Task SignIn(AppUser user)
        {
            var identity = await userManager.CreateIdentityAsync(
                user, DefaultAuthenticationTypes.ApplicationCookie);
            GetAuthenticationManager().SignIn(identity);
        }


        private async Task SignOut()
        {
            GetAuthenticationManager().SignOut(DefaultAuthenticationTypes.ApplicationCookie);
        }
        private IAuthenticationManager GetAuthenticationManager()
        {
            var ctx = Request.GetOwinContext();
            return ctx.Authentication;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && userManager != null)
            {
                userManager.Dispose();
            }
            base.Dispose(disposing);
        }
        //private string GetRedirectUrl()
        //{
        //    return Redirect("http://10.1.81.226:1043/Home/Index");

        //}


        //----------------------------------------------------------------------------------------------------------------------

        [HttpPost]
        [OverRidingAuthorizationAttribute]
        public JsonResult CreateEmployee(Employees employee)
        {
            string res = "";

            if (ModelState.IsValid)
            {
                _employeesRepository.CreateEmployee(employee);
                res = JsonConvert.SerializeObject(employee);

            }
            else
            {
                ModelState.AddModelError("", "");
            }
            return Json(res);
        }

        [HttpGet]
        [OverRidingAuthorizationAttribute]
        public JsonResult GetAllEmployee()
        {


            var employee = from emp in _employeesRepository.GetAllEmployees()
                           from department in emp.Department
                           select new { Id = emp.Id, Name = emp.Name, Department = department.Name };

            string res = JsonConvert.SerializeObject(employee, Formatting.Indented,
                                                                                        new JsonSerializerSettings
                                                                                        {
                                                                                            PreserveReferencesHandling = PreserveReferencesHandling.Objects
                                                                                        });

            return Json(res, JsonRequestBehavior.AllowGet);


        }


        [HttpGet]
        [OverRidingAuthorizationAttribute]
        public JsonResult GetEmpById(int id)
        {
            var employee = _employeesRepository.GetAllEmployees().Single(e => e.Id == id);
            // var employee = from de in _departmentsRepository.GetAllDepartments() from e in de.Employs where e.Id == id select e;

            string res = JsonConvert.SerializeObject(employee, Formatting.Indented,
                                                                                   new JsonSerializerSettings
                                                                                   {
                                                                                       PreserveReferencesHandling = PreserveReferencesHandling.Objects
                                                                                   });
            return Json(res, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        [OverRidingAuthorizationAttribute]
        public JsonResult EditEmp(int id, string name, List<string> dept)
        {
            //_employeesRepository.Edit(emp);
            //string res = JsonConvert.SerializeObject(emp);
            return Json("");
        }

        [HttpGet]
        [OverRidingAuthorizationAttribute]
        public JsonResult LoadDropDownList()
        {
            var dept = from depts in _departmentsRepository.GetAllDepartments() group depts.Name by depts.Id into g select new { Id = g.Key, depart = g };

            string res = JsonConvert.SerializeObject(dept);

            return Json(res, JsonRequestBehavior.AllowGet);
        }



        //[HttpPost]
        //[OverRidingAuthorizationAttribute]
        //public JsonResult DeleteEmp(int id)
        //{
        //    Employees emp = _employeesRepository.GetAllEmployees().Single(e => e.Id == id);
        //   _employeesRepository.DeleteEmp(id);
        //   string res = JsonConvert.SerializeObject(emp);
        //   return Json(res);

        //}


        //public async Task<JsonResult> DeleteEmps(int id)
        //{
        //    var user =await userManager.FindByIdAsync(id.ToString());
        //    var x = await userManager.DeleteAsync(user);
        //    Employees emp = _employeesRepository.GetAllEmployees().Single(e => e.Id == id);
        //    _employeesRepository.DeleteEmp(id);



        //    string res = JsonConvert.SerializeObject(emp);
        //    return Json(res);

        //}
        [Authorize(Roles = "Admin")]
        [HttpDelete]

        public async Task<JsonResult> Del(int id)
        {
            Employees emp1 = _employeesRepository.GetAllEmployees().Single(e => e.Id == id);

            var user = await userManager.FindByIdAsync(emp1.AppId.ToString());
            _employeesRepository.DeleteEmp(id);
            var x = userManager.DeleteAsync(user);
            //Employees emp = _employeesRepository.GetAllEmployees().Single(e => e.Id == id);

            string res = "redirect";
            return Json(res);


        }

        ////---------------------------------------------------------------------departmentcode begins------------------------------------------------
        [OverRidingAuthorizationAttribute]
        public JsonResult CreateDepartment(Departments department)
        {
            string res = "";

            if (ModelState.IsValid)
            {
                _departmentsRepository.CreateDepartment(department);
                res = JsonConvert.SerializeObject(department);
            }

            return Json(res);

        }


        public JsonResult GetAllDepartments()
        {

            IEnumerable<Departments> departments = _departmentsRepository.GetAllDepartments();

            string res = JsonConvert.SerializeObject(departments);

            return Json(res, JsonRequestBehavior.AllowGet);


        }

        [HttpGet]
        [OverRidingAuthorizationAttribute]
        public JsonResult GetAllEmployeesByDepartments()
        {

            var employees = from department in _departmentsRepository.GetAllDepartments()
                            select new { Id = department.Id, Name = department.Name, Total = department.Employs.Count() };


            // var dept = from depts in _departmentsRepository.GetAllDepartments() group depts.Name by depts.Id into g select new { Id = g.Key, Name = g, Total = g.Count() };


            string res = JsonConvert.SerializeObject(employees);

            return Json(res, JsonRequestBehavior.AllowGet);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]

        public JsonResult DeleteDept(int id)
        {
            Departments dept = _departmentsRepository.GetAllDepartments().Single(e => e.Id == id);
            _departmentsRepository.Delete(id);
            string res = JsonConvert.SerializeObject(dept);
            return Json(res);
        }

        [HttpPost]
        [OverRidingAuthorizationAttribute]
        public JsonResult EditDept(Departments dept)
        {
            _departmentsRepository.EditDept(dept);
            string res = JsonConvert.SerializeObject(dept);
            return Json(res);
        }
        [OverRidingAuthorizationAttribute]
        public JsonResult GetDeptById(int id)
        {

            Departments department = _departmentsRepository.GetAllDepartments().Single(dept => dept.Id == id);
            string res = JsonConvert.SerializeObject(department, Formatting.Indented,
                                                                                    new JsonSerializerSettings
                                                                                    {
                                                                                        PreserveReferencesHandling = PreserveReferencesHandling.Objects
                                                                                    });
            return Json(res, JsonRequestBehavior.AllowGet);
        }


    }
}