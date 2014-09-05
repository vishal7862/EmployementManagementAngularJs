using EmployementApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
namespace EmployementApplication
{

    public class ValuesController : ApiController
    {
        IEmployeesRepository _employeesRepository = new EFEmployeesRepository();
        IDepartmentsRepository _departmentRepository = new EFDepartmentsRepository();

        [Authorize(Roles = "Admin")]
        public IEnumerable<EmployeeApp> GetAllEmp()
        {
            IEnumerable<Employees> emps = _employeesRepository.GetAllEmployees();
            List<EmployeeApp> ac = new List<EmployeeApp>();
            foreach (var item in emps)
            {

                ac.Add(new EmployeeApp
                {
                    Id = item.Id,
                    Name = item.Name,
                    Email = item.user.Email,
                    DeptName = item.Department.Select(d => d.Name).ToList(),
                    EmailConfirmed = item.user.EmailConfirmed
                });
            }
            return ac;
        }

        [Route("EditEmp")]
        [HttpPost]
        public IHttpActionResult EditEmp(Employees emp)
        {
            _employeesRepository.Edit(emp);
            return Ok(emp);
        }

        [HttpGet]
        public EmployeeApp GetEmpById(int Id)
        {
            Employees emp = _employeesRepository.GetAllEmployees().Single(em => em.Id == Id);
            EmployeeApp empApp = new EmployeeApp();
            empApp.Id = emp.Id;
            empApp.Name = emp.Name;
            empApp.DeptName = emp.Department.Select(dept => dept.Name).ToList();
            empApp.DeptsValue = emp.Department.Select(dept => dept.Name).ToList();
            empApp.DeptsValue.Clear();
            emp.Department.Clear();

            return empApp;
        }

        [Authorize(Roles = "Admin")]
        [Route("EditEmpByAdmin")]
        [HttpPost]
        public IHttpActionResult EditEmpByAdmin(EmployeeApp emp)
        {
            Employees employee = _employeesRepository.GetAllEmployees().Single(e => e.Id == emp.Id);
            employee.Name = emp.Name;
            employee.Department.Clear();
            _employeesRepository.Edit(employee);
            foreach (string id in emp.DeptsValue)
            {
                _departmentRepository.editemptodept(Convert.ToInt32(id), employee);

            }

            return Ok(employee);
        }
    }
}