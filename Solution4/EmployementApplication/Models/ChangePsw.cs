using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EmployementApplication.Models
{
    public class ChangePsw
    {
     
        public string OldPassword { get; set; }

      
        public string NewPassword { get; set; }

       
        public string ConfirmPassword { get; set; }

    }
}