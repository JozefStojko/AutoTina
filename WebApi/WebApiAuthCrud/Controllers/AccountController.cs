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

namespace WebApiAuthCrud.Controllers
{
    public class AccountController : ApiController
    {
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
            bool isAdmin = false;
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;
            if (Convert.ToBoolean(identityClaims.FindFirst("IsAdmin").Value) == true) //ez működik
            {
                isAdmin = true;
            }
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
                IsAdmin = isAdmin
            };
            return model;
        }


        //// GET: api/GetOneUserClaims
        //[Route("api/GetOneUserClaims")]
        //[HttpGet]
        //[AllowAnonymous]
        //[ResponseType(typeof(AccountModel))]
        //public async Task<IHttpActionResult> GetOneUserClaims()
        //{
        //    bool isAdmin = false;
        //    var identityClaims = (ClaimsIdentity)User.Identity;
        //    IEnumerable<Claim> claims = identityClaims.Claims;
        //    if (Convert.ToBoolean(identityClaims.FindFirst("IsAdmin").Value) == true) //ez működik
        //    {
        //        isAdmin = true;
        //    }

        //    AccountModel model = new AccountModel()
        //    {
        //        UserName = identityClaims.FindFirst("Username").Value,
        //        Email = identityClaims.FindFirst("Email").Value,
        //        FirstName = identityClaims.FindFirst("FirstName").Value,
        //        LastName = identityClaims.FindFirst("LastName").Value,
        //        LoggedOn = identityClaims.FindFirst("LoggedOn").Value,
        //        IsAdmin = isAdmin
        //    };

        //    return Ok(model);
        //}



    }
}
