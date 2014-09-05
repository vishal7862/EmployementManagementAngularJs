using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.ModelBinding;


namespace EmployementApplication.Models
{
    
    public class EFDepartmentsRepository :IDepartmentsRepository
    {
        ManagementDbContext db = new ManagementDbContext();

     public IEnumerable<Departments> GetAllDepartments()
        {
            return db.Departments.ToList();
        }

        public void CreateDepartment(Departments dept)
        {
            db.Departments.Add(dept);
            db.SaveChanges();
        }

        public void EditDept(Departments dept)
        {
            db.Entry(dept).State =EntityState.Modified;
            db.SaveChanges();
        }
        public void addemptodept(int deptid,Employees emp)
        {
           var x= db.Departments.Where(dep => dep.Id == deptid).First();
           x.Employs.Add(emp);
       
           db.SaveChanges();
        }

        public void editemptodept(int deptid, Employees emp)
        {
            Employees z = db.Employs.Where(em => em.Id == emp.Id).First();
            var x = db.Departments.Where(dep => dep.Id == deptid).First();
            
            x.Employs.Add(z);
            db.SaveChanges();
        }
        public void Delete(int id)
        {
            Departments dept = db.Departments.Find(id);
            db.Departments.Remove(dept);
            db.SaveChanges();
        }

      
    }
}