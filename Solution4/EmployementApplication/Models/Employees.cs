using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace EmployementApplication.Models
{
    public class Employees
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        public virtual ICollection<Departments> Department { get; set; }

       
        public virtual string AppId { get; set; }
        [ForeignKey("AppId")]
        public virtual AppUser user { get; set; }
    }
}