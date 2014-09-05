namespace EmployementApplication.Migrations
{
    using EmployementApplication.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<EmployementApplication.Models.ManagementDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(EmployementApplication.Models.ManagementDbContext context)
        {
            this.AddUserAndRoles();
        }

        bool AddUserAndRoles()
        {

            bool success = false;

            var idManager = new IdentityManager();

            success = idManager.CreateRole("Admin");

            if (!success == true) return success;

            success = idManager.CreateRole("CanEdit");

            if (!success == true) return success;

            success = idManager.CreateRole("User");

            if (!success) return success;

            var newUser = new AppUser()
            {
                UserName = "vishal@gmail.com",
                Email = "vishal@gmail.com"
            };
            // Be careful here - you  will need to use a password which will 
            // be valid under the password rules for the application, 
            // or the process will abort:
            success = idManager.CreateUser(newUser, "qwerty");
            if (!success) return success;
            success = idManager.AddUserToRole(newUser.Id, "Admin");
            if (!success) return success;
            success = idManager.AddUserToRole(newUser.Id, "CanEdit");
            if (!success) return success;
            success = idManager.AddUserToRole(newUser.Id, "User");
            if (!success) return success;
            return success;
        }
    }

}

