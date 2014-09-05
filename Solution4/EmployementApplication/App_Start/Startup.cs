using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EmployementApplication.Models;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.DataProtection;
using System.Net.Mail;
using System.Net;
using System.Net.Http;
using Microsoft.Owin.Security.OAuth;

namespace EmployementApplication
{
   

    public class Startup
    {
        public static Func<UserManager<AppUser>> UserManagerFactory { get; private set; }
      
        public void Configuration(IAppBuilder app)
        {
            // this is the same as before
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Home/LogIn")
               
            });
         

            // configure the user manager
            UserManagerFactory = () =>
            {
                
           

                var usermanager = new UserManager<AppUser>(
                    new UserStore<AppUser>(new ManagementDbContext()));
                // allow alphanumeric characters in username
                usermanager.UserValidator = new UserValidator<AppUser>(usermanager)
                {
                    AllowOnlyAlphanumericUserNames = false
                };
               // usermanager.ClaimsIdentityFactory = new AppUserClaimsIdentityFactory();
                var provider = new DpapiDataProtectionProvider("Sample");
            
                usermanager.UserTokenProvider = new DataProtectorTokenProvider<AppUser>(provider.Create("EmailConfirmation"));

              //  usermanager.EmailService = new EmailService();
                
                return usermanager;
            };
        }
    }
    //public class EmailService : IIdentityMessageService
    //{
    //    public Task SendAsync(IdentityMessage message)
    //    {
    //        MailMessage email = new MailMessage("vishal.kumarmitra786@gmail.com", message.Destination);

    //        email.Subject = message.Subject;

    //        email.Body = message.Body;

    //        email.IsBodyHtml = true;

    //        var mailClient = new SmtpClient("smtp.gmail.com", 587) { Credentials = new NetworkCredential("vishal.kumarmitra786@gmail.com", "vis9033109704chi"), EnableSsl = true, DeliveryMethod = SmtpDeliveryMethod.Network, UseDefaultCredentials = false,Timeout=10000 };

    //        return  mailClient.Send(email);
    //    }
    //}
}