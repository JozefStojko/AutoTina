using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using WebApiAuthCrud.Models;

namespace WebApiAuthCrud
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);
            var user = await manager.FindAsync(context.UserName, context.Password);
            if (user != null)
            {
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim("Username", user.UserName));
                identity.AddClaim(new Claim("Email", user.Email));
                identity.AddClaim(new Claim("FirstName", user.FirstName));
                identity.AddClaim(new Claim("LastName", user.LastName));
                identity.AddClaim(new Claim("IsAdmin", user.IsAdmin.ToString()));
                identity.AddClaim(new Claim("LoggedOn", DateTime.Now.ToString()));

                identity.AddClaim(new Claim("Address", user.Address.ToString()));
                identity.AddClaim(new Claim("City", user.City.ToString()));
                identity.AddClaim(new Claim("CompanyName", user.CompanyName.ToString()));
                identity.AddClaim(new Claim("IdNumber", user.IdNumber.ToString()));
                identity.AddClaim(new Claim("Phone", user.Phone.ToString()));
                identity.AddClaim(new Claim("PIB", user.PIB.ToString()));
                identity.AddClaim(new Claim("ZipCode", user.ZipCode.ToString()));
                identity.AddClaim(new Claim("Id", user.Id.ToString()));
                context.Validated(identity);
            }
            else
                return;
        }

    }
}