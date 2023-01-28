using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebApiAuthCrud.Models;


namespace WebApiAuthCrud.Controllers
{
    public class AccountingsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Accountings
        [AllowAnonymous]
        public IQueryable<Accounting> GetAccountings()
        {
            return db.Accountings;
        }

        // GET: api/Accountings/5
        [ResponseType(typeof(Accounting))]
        public async Task<IHttpActionResult> GetAccounting(int id)
        {
            Accounting accounting = await db.Accountings.FindAsync(id);
            if (accounting == null)
            {
                return NotFound();
            }

            return Ok(accounting);
        }

        // PUT: api/Accountings/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutAccounting(int id, Accounting accounting)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != accounting.Id)
            {
                return BadRequest();
            }

            db.Entry(accounting).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountingExists(id))
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

        // POST: api/Accountings
        [AllowAnonymous]
        [ResponseType(typeof(Accounting))]
        //public async Task<IHttpActionResult> PostAccounting(Accounting accounting)
        
        public async Task<IHttpActionResult> PostAccounting(Accounting[] accountings)
        {
            string message = "";
            for (int i = 0; i < accountings.Length; i++)
            {
                Random random = new Random();
                int num = random.Next(100000);
                string accountingNumber = DateTime.Now.ToString("d") + "-" + num.ToString();

                Accounting accounting = new Accounting()
                {
                    UserName = accountings[i].UserName,
                    ProductId = accountings[i].ProductId,
                    NumberOfPiecesOfProduct = accountings[i].NumberOfPiecesOfProduct, //kolicina
                    ProductName = accountings[i].ProductName,
                    Price = accountings[i].Price,
                    Car = accountings[i].Car,
                    Date = DateTime.Now, // datum narucivanja
                    RegularAccountNumber = accountingNumber,// redni broj racuna
                    AmountOfBase = accountings[i].AmountOfBase,// iznos osnovice;
                    AmountOfVAT = accountings[i].AmountOfVAT,// iznos PDV koji je obracunat na osnovicu;
                    PaymentAamount = accountings[i].PaymentAamount, // iznos za placanje
                };
                message = message + accounting.ProductName + accounting.NumberOfPiecesOfProduct + accounting.Price + accounting.Date + accounting.RegularAccountNumber + Environment.NewLine;
                db.Accountings.Add(accounting);
                db.SaveChanges();
            }

            //db.Accountings.Add(accountings);
            //await db.SaveChangesAsync();
            string user = "";
            for (int i = 0; i < accountings.Length; i++)
            {
                user = accountings[i].UserName;
            }


            //IQueryable<AccountModel> accountmodels = db.AccountModels;
            //AccountModel account = accountmodels.FirstOrDefault(a => a.UserName == user);
            

            //string emailAddress = account.Email;


            var client = new System.Net.Mail.SmtpClient("smtp.gmail.com", 587);
            client.UseDefaultCredentials = false;
            client.EnableSsl = true;

            client.Credentials = new System.Net.NetworkCredential("autotinawebshopf@gmail.com", "autotinawebshoppassword");

            var mailMessage = new System.Net.Mail.MailMessage();
            mailMessage.From = new System.Net.Mail.MailAddress("autotinawebshop@gmail.com");

            //mailMessage.To.Add(emailAddress);
            mailMessage.To.Add("sztojko.jozsef@gmail.com");

            if (!string.IsNullOrEmpty("cc@gmail.com"))
            {
                mailMessage.CC.Add("cc@gmail.com");
            }

            mailMessage.Body = message;

            mailMessage.Subject = "Uspešno ste završili kupovinu na sajtu Auto Tina web shop.";

            mailMessage.BodyEncoding = System.Text.Encoding.UTF8;
            mailMessage.SubjectEncoding = System.Text.Encoding.UTF8;

            await client.SendMailAsync(mailMessage);


            return Ok("Accountings recorded.");
            //return CreatedAtRoute("DefaultApi", new { id = accounting.Id }, accounting);
        }

        // POST: api/Accountings
        //[AllowAnonymous]
        //[ResponseType(typeof(Accounting))]

        //public async Task<IHttpActionResult> PostAccounting(Accounting accountings)
        //{

        //    db.Accountings.Add(accountings);
        //    await db.SaveChangesAsync();

        //    return Ok("Accountings recorded.");
        //}





        // DELETE: api/Accountings/5
        [ResponseType(typeof(Accounting))]
        public async Task<IHttpActionResult> DeleteAccounting(int id)
        {
            Accounting accounting = await db.Accountings.FindAsync(id);
            if (accounting == null)
            {
                return NotFound();
            }

            db.Accountings.Remove(accounting);
            await db.SaveChangesAsync();

            return Ok(accounting);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccountingExists(int id)
        {
            return db.Accountings.Count(e => e.Id == id) > 0;
        }
    }
}