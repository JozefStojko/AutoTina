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
    public class TaxRatesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/TaxRates
        [AllowAnonymous]
        public IQueryable<TaxRate> GetTaxRates()
        {
            return db.TaxRates;
        }

        // GET: api/TaxRates/5
        [ResponseType(typeof(TaxRate))]
        public async Task<IHttpActionResult> GetTaxRate(string id)
        {
            TaxRate taxRate = await db.TaxRates.FindAsync(id);
            if (taxRate == null)
            {
                return NotFound();
            }

            return Ok(taxRate);
        }

        // PUT: api/TaxRates/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutTaxRate(string id, TaxRate taxRate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != taxRate.Id)
            {
                return BadRequest();
            }

            db.Entry(taxRate).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaxRateExists(id))
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

        // POST: api/TaxRates
        [ResponseType(typeof(TaxRate))]
        public async Task<IHttpActionResult> PostTaxRate(TaxRate taxRate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TaxRates.Add(taxRate);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TaxRateExists(taxRate.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = taxRate.Id }, taxRate);
        }

        // DELETE: api/TaxRates/5
        [ResponseType(typeof(TaxRate))]
        public async Task<IHttpActionResult> DeleteTaxRate(string id)
        {
            TaxRate taxRate = await db.TaxRates.FindAsync(id);
            if (taxRate == null)
            {
                return NotFound();
            }

            db.TaxRates.Remove(taxRate);
            await db.SaveChangesAsync();

            return Ok(taxRate);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TaxRateExists(string id)
        {
            return db.TaxRates.Count(e => e.Id == id) > 0;
        }
    }
}