using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmployementApplication.Models
{
    public class EmployeeApp
    {
        public int Id { get; set; }
        public string AppId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public ICollection<string> DeptName { get; set; }

        public ICollection<string> DeptsValue { get; set; }

        public bool EmailConfirmed { get; set; }
        public string EmailConStr { get; set; }
    }
}