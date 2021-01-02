using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebApiAuthCrud.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsAdmin { get; set; }
        public string CompanyName { get; set; }
        public int PIB { get; set; }
        public int IdNumber { get; set; }
        public string Phone { get; set; }
        public int ZipCode { get; set; }
        public string City { get; set; }
        public string Address { get; set; }

    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {

        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public DbSet<AccountModel> AccountModels { get; set; }
        public DbSet<ProductModel> ProductModels { get; set; }
        public DbSet<CarModel> CarModels { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<CarMark> CarMarks { get; set; }
        public DbSet<ProductTypeModel> ProductTypeModels { get; set; }
        public DbSet<TaxRate>  TaxRates{ get; set; }
        public DbSet<Accounting> Accountings { get; set; }





        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //AspNetUsers -> User
            modelBuilder.Entity<ApplicationUser>()
                .ToTable("User");
            //AspNetRoles -> Role
            modelBuilder.Entity<IdentityRole>()
                .ToTable("Role");
            //AspNetUserRoles -> UserRole
            modelBuilder.Entity<IdentityUserRole>()
                .ToTable("UserRole");
            //AspNetUserClaims -> UserClaim
            modelBuilder.Entity<IdentityUserClaim>()
                .ToTable("UserClaim");
            //AspNetUserLogins -> UserLogin
            modelBuilder.Entity<IdentityUserLogin>()
                .ToTable("UserLogin");
        }

        public System.Data.Entity.DbSet<WebApiAuthCrud.Models.CarModelType> CarModelTypes { get; set; }
    }
}