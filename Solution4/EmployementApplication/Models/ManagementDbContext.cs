using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace EmployementApplication.Models
{
    public class AppUser : IdentityUser
    {
 
    }
    public class IdentityManager
    {
        public bool RoleExists(string name)
        {
            var rm = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ManagementDbContext()));
            return rm.RoleExists(name);
        }
        public bool CreateRole(string name)
        {
            var rm = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ManagementDbContext()));
            var idResult = rm.Create(new IdentityRole(name));
            return idResult.Succeeded;
        }
        public bool CreateUser(AppUser user, string password)
        {
            var um = new UserManager<AppUser>(new UserStore<AppUser>(new ManagementDbContext()));
            var idResult = um.Create(user, password);
            return idResult.Succeeded;
        }
        public bool AddUserToRole(string userId, string roleName)
        {
            var um = new UserManager<AppUser>(new UserStore<AppUser>(new ManagementDbContext()));
            var idResult = um.AddToRole(userId, roleName);
            return idResult.Succeeded;
        }
        //public void ClearUserRoles(string userId)
        //{
        //    var um = new UserManager<AppUser>(new UserStore<AppUser>(new ManagementDbContext()));
        //    var user = um.FindById(userId);
        //    var currentRoles = new List<IdentityUserRole>();
        //    currentRoles.AddRange(user.Roles);
        //    foreach (var role in currentRoles)
        //    {
        //        um.RemoveFromRole(userId, role.Role.Name);
        //    }
        //}
    }

    public class ManagementDbContext :IdentityDbContext<AppUser>
    {
        public ManagementDbContext() : base("Management")
        {
         Database.SetInitializer<ManagementDbContext>(new CreateDatabaseIfNotExists<ManagementDbContext>());
        }
     
        public IDbSet<Employees> Employs { get; set; }
        public IDbSet<Departments> Departments { get; set; }
       
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
           

           // modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
           // modelBuilder.Entity<Departments>().HasMany(emps => emps.Employs).WithMany(x=>x.Department).Map(mc =>
           //{
           //    mc.ToTable("EmployeeDepartment");
           //    mc.MapLeftKey("Id");
           //    mc.MapRightKey("Id");
           //});
           //// modelBuilder.Entity<Departments>().HasMany(up => up.Employs)
           //.WithMany(course => course.Departments)
           //.Map(mc =>
           //{
           //    mc.ToTable("EmployeeDepartment");
           //    mc.MapLeftKey("EmpID");
           //    mc.MapRightKey("DeptID");
           //}
       //); 
            //modelBuilder.Entity<Employees>()
            //.HasMany(c => c.Department)
            //.WithMany();
           
            
            base.OnModelCreating(modelBuilder);
            
        }
       
    }
}