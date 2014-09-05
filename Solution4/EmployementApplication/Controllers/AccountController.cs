using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using EmployementApplication.Models;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System.Web;
namespace EmployementApplication.Controllers
{
    public class AccountController : ApiController
    {
        IEmployeesRepository _employeesRepository = new EFEmployeesRepository();
       
        private readonly UserManager<AppUser> userManager;
        public AccountController() : this(Startup.UserManagerFactory.Invoke()) { }
        public AccountController(UserManager<AppUser> userManager)
        {
            this.userManager = userManager;
        }

        [Route("Login")]
     
        public async Task<IHttpActionResult> Login(LogInModel model)
        {
            if (!ModelState.IsValid)
            {
              return BadRequest(ModelState.ToString());
            }

            var user = await userManager.FindAsync(model.Email, model.Password);
            if (user != null)
            {
                if (user.EmailConfirmed == true)
                {
                    var identity = await userManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
                    GetAuthenticationManager().SignIn(identity);
                    return Ok(user);
                }
                else
                {
                    return BadRequest("Please confirm your Email");
                }
            }
            //if it goes this far
          
            return BadRequest("Enter a valid email or password");
        //    if (user != null)
        ////    {
        //        var identity = await userManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
        //        GetAuthenticationManager().SignIn(identity);
        //       // return Ok(identity);
        //        //if (user.UserName == "vishal@gmail.com")
        //        //{
        //        //    GetAuthenticationManager().SignIn(identity);

        //        //    // return Redirect("http://10.1.81.226:1043/Home/Index");

        //        //}
        //        //else
        //        //{
        //        //    if (user.EmailConfirmed == true)
        //        //    {
        //        //        GetAuthenticationManager().SignIn(identity);

        //        //        // return Redirect("http://10.1.81.226:1043/Home/Index");

        //        //    }
        //        //    else
        //        //    {
        //        //        ModelState.AddModelError("", "please confirm your email");

        //        //    }

        //    }
        }


        //public async Task<IHttpActionResult> Logout()
        //{
        //    await SignOut();
        //    return Ok();
        //}
       
        private async Task SignIn(AppUser user)
        {
            var identity = await userManager.CreateIdentityAsync(
                user, DefaultAuthenticationTypes.ApplicationCookie);
                GetAuthenticationManager().SignIn(identity);
        }

        [HttpGet]
        [Route("GetCurrEmp")]
        public EmployeeApp GetCurrEmp()
        {
            var usr =User.Identity.GetUserId();
            AppUser user = userManager.FindById(usr);
            Employees emp1 = _employeesRepository.GetAllEmployees().Where(e => e.AppId == usr).First();
            EmployeeApp employee = new EmployeeApp();
            employee.AppId = emp1.AppId;
            employee.Id = emp1.Id;
            employee.Name = emp1.Name;
            employee.Email = emp1.user.Email;
            employee.DeptName = emp1.Department.Select(dept => dept.Name).ToList();
            return employee;
        }

        [HttpGet]
        [Route("GetCurrAdmin")]
        public AdminUser GetCurrAdmin()
        {
            var usr = User.Identity.GetUserId();
            if (usr != null)
            {
                AppUser user = userManager.FindById(usr);

                AdminUser adminUser = new AdminUser();
                adminUser.Email = user.Email;
                return adminUser;
            }
            return new AdminUser();
        }

   
        [Route("EditPassword")]
        public async Task<IHttpActionResult> EditPassword(ChangePsw model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.ToString());
            }
            var userEmail = User.Identity.GetUserName();
            AppUser user =await userManager.FindAsync(userEmail, model.OldPassword);
            if (user != null)
            {

                var x = await userManager.ChangePasswordAsync(user.Id, model.OldPassword, model.NewPassword);
                await userManager.UpdateAsync(user);
                return Ok(user);

            }

            //if it comes this far this error shoeld be there
         //  ModelState.AddModelError("", "Old Passowrd Didn't Matched");
           return BadRequest("Old Passowrd Didn't Matched");
        
        }

        //[Route("DeleteEmp")]
        //public async Task<IHttpActionResult> DeleteEmp(int Id)
        //{
        //    Employees emp1 = _employeesRepository.GetAllEmployees().Single(e => e.Id == id);
        //    _employeesRepository.DeleteEmp(id);
        //    var user = await userManager.FindByIdAsync(emp1.AppId.ToString());
        //    var x = userManager.DeleteAsync(user);
        //    //Employees emp = _employeesRepository.GetAllEmployees().Single(e => e.Id == id);

            
        //    return Ok();

        //}

        [Route("Logout")]
        public IHttpActionResult SignOut()
        {
            GetAuthenticationManager().SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return Ok();
        }
      
        private IAuthenticationManager GetAuthenticationManager()
        {
            //var ctx = Request.GetOwinContext();
            // var ctx = Request.Properties["MS_HttpContext"].request.GetOwinContext();
            var ctx = HttpContext.Current.GetOwinContext();
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
    }


}

