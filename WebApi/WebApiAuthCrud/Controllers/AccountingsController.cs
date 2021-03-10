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
        public async Task<IHttpActionResult> GetAccounting(string id)
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
        public async Task<IHttpActionResult> PutAccounting(string id, Accounting accounting)
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
        public async Task<IHttpActionResult> PostAccounting(Accounting accounting)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Accountings.Add(accounting);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = accounting.Id }, accounting);
        }

        // DELETE: api/Accountings/5
        [ResponseType(typeof(Accounting))]
        public async Task<IHttpActionResult> DeleteAccounting(string id)
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

        private bool AccountingExists(string id)
        {
            return db.Accountings.Count(e => e.Id == id) > 0;
        }
    }
}