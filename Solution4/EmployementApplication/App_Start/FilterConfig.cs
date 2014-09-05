using System.Net;
using System.Web;
using System.Web.Mvc;

namespace EmployementApplication
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            //filters.Add(new HandleErrorAttribute());
        //    filters.Add(new OverRidingAuthorizationAttribute());
        }
    }


    public class OverRidingAuthorizationAttribute : AuthorizeAttribute
    {

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            var httpContext = filterContext.HttpContext;
            var request = httpContext.Request;
            var response = httpContext.Response;
            var user = httpContext.User;

            if (request.IsAjaxRequest())
            {
                if (user.Identity.IsAuthenticated == false)
                    response.StatusCode = (int)HttpStatusCode.Unauthorized;

                response.SuppressFormsAuthenticationRedirect = true;
                response.End();

            }
            base.HandleUnauthorizedRequest(filterContext);
            //filterContext.Result = new RedirectResult("http://localhost:1612/#Login");

        }


        //protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        //{
           
           
        //    filterContext.Result = new RedirectResult("http://localhost:1612/#Login");

        //}

       
    }
}
