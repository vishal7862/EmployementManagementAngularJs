using EmployementApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EmployementApplication.Controllers
{
    public class DepartmentController : ApiController
    {
        IDepartmentsRepository _departmentRepository = new EFDepartmentsRepository();
       
        [Authorize(Roles = "Admin")]
        public IEnumerable<DepartmentTotal> GetAllDept()
        {
            IEnumerable<Departments> depts = _departmentRepository.GetAllDepartments();
            List<DepartmentTotal> ac = new List<DepartmentTotal>();
            foreach (var item in depts)
            {

                ac.Add(new DepartmentTotal
                {
                    Id = item.Id,
                    Name = item.Name,
                    Total = item.Employs.Count()

                });
            }
            return ac;
        }
        // POST /api/values

        [Authorize(Roles = "Admin")]
        [HttpPost]

        public DepartmentTotal  PostCreate(Departments dept)
        {
          _departmentRepository.CreateDepartment(dept);
           DepartmentTotal dept1 = new DepartmentTotal();
           dept1.Id = dept.Id;
           dept1.Name = dept.Name;
           dept1.Total = 0;
           return dept1;
        }

        [Authorize(Roles = "Admin")]
        [Route("EditDept")]
        [HttpPost]
        public IHttpActionResult EditDept(Departments dept)
        {
            _departmentRepository.EditDept(dept);
            return Ok(dept);
        }

        [Authorize(Roles = "Admin")]
        [Route("GetSingleDept")]
    
        public DepartmentTotal GetSingleDept(int Id) {
            Departments dept1=_departmentRepository.GetAllDepartments().Single(d => d.Id==Id);
            DepartmentTotal department = new DepartmentTotal();
            department.Id = dept1.Id;
            department.Name = dept1.Name;
            department.Total = dept1.Employs.Count();
            return department;
        }

    }
}
