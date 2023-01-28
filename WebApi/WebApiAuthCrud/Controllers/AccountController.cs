using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebApiAuthCrud.Models;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Web;

namespace WebApiAuthCrud.Controllers
{
    public class AccountController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();


        [HttpPost]
        [AllowAnonymous]
        [Route("api/Account/Register")]
        public IdentityResult Register(AccountModel model)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);


        var user = new ApplicationUser() { UserName = model.UserName, Email = model.Email };
        user.FirstName = model.FirstName;
        user.LastName = model.LastName;
        user.Address = model.Address;
        user.City = model.City;
        user.CompanyName = model.CompanyName;
        user.IdNumber = model.IdNumber;
        user.Phone = model.Phone;
        user.PIB = model.PIB;
        user.ZipCode = model.ZipCode;
        model.Id = user.Id;
        user.IsAdmin = false;
        manager.PasswordValidator = new PasswordValidator
        {
            RequiredLength = 3
        };
        IdentityResult result = manager.Create(user, model.Password);
        return result;
    }

        [HttpGet]
        [Route("api/GetUserClaims")]
        [AllowAnonymous]
        public AccountModel GetUserClaims()
            {
            //bool isAdmin = false;
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;
            //if (Convert.ToBoolean(identityClaims.FindFirst("IsAdmin").Value) == true) //ez működik
            //{
            //    isAdmin = true;
            //}
            AccountModel model = new AccountModel()
            {
                UserName = identityClaims.FindFirst("Username").Value,
                Email = identityClaims.FindFirst("Email").Value,
                FirstName = identityClaims.FindFirst("FirstName").Value,
                LastName = identityClaims.FindFirst("LastName").Value,
                Address = identityClaims.FindFirst("Address").Value,
                City = identityClaims.FindFirst("City").Value,
                CompanyName = identityClaims.FindFirst("CompanyName").Value,
                IdNumber = int.Parse(identityClaims.FindFirst("IdNumber").Value),
                Phone = identityClaims.FindFirst("Phone").Value,
                PIB = int.Parse(identityClaims.FindFirst("PIB").Value),
                ZipCode = int.Parse(identityClaims.FindFirst("ZipCode").Value),
                LoggedOn = identityClaims.FindFirst("LoggedOn").Value,
                IsAdmin = Convert.ToBoolean(identityClaims.FindFirst("IsAdmin").Value),
                Id = identityClaims.FindFirst("Id").Value
            };
            return model;
        }

        // PUT: api/account/5
        [HttpPut]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutUser(string id, ApplicationUser model)
        {
            //var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            //var manager = new UserManager<ApplicationUser>(userStore);


            //var user = new ApplicationUser() { UserName = model.UserName, Email = model.Email };
            //AccountModel model = new AccountModel()
            //{
            //    Id = id,
            //    UserName = userModel.UserName,
            //    Password = userModel.Password,
            //    CompanyName = userModel.CompanyName,
            //    PIB = userModel.PIB,
            //    IdNumber = userModel.IdNumber,
            //    Email = userModel.Email,
            //    Phone = userModel.Phone,
            //    FirstName = userModel.FirstName,
            //    LastName = userModel.LastName,
            //    ZipCode = userModel.ZipCode,
            //    City = userModel.City,
            //    Address = userModel.Address,
            //    IsAdmin = false,
            //    LoggedOn = userModel.LoggedOn
            //};

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
             }

            if (id != model.Id)
            {
                return BadRequest();
            }

            db.Entry(model).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (accountexists(id) == 0)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
            }

            private int accountexists(string id)
            {
                return db.Users.Count(e => e.Id == id);
            }

        // PUT: api/account/5
        //[HttpPut]
        //[ResponseType(typeof(void))]
        //public async Task<IHttpActionResult> PutUser(int id, AccountModel accountModel)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id.ToString() != accountModel.Id)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(accountModel).State = EntityState.Modified;

        //    try
        //    {
        //        await db.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!AccountModelExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        //private bool AccountModelExists(int id)
        //{
        //    return db.AccountModels.Count(e => e.Id == id.ToString()) > 0;
        //}




    }
}
