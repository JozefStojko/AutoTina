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
    public class CarModelTypeEnginesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/CarModelTypeEngines
        public IQueryable<CarModelTypeEngine> GetCarModelTypeEngines()
        {
            return db.CarModelTypeEngines;
        }

        // GET: api/CarModelTypeEngines/5
        [ResponseType(typeof(CarModelTypeEngine))]
        public async Task<IHttpActionResult> GetCarModelTypeEngine(int id)
        {
            CarModelTypeEngine carModelTypeEngine = await db.CarModelTypeEngines.FindAsync(id);
            if (carModelTypeEngine == null)
            {
                return NotFound();
            }

            return Ok(carModelTypeEngine);
        }

        // PUT: api/CarModelTypeEngines/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCarModelTypeEngine(int id, CarModelTypeEngine carModelTypeEngine)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != carModelTypeEngine.Id)
            {
                return BadRequest();
            }

            db.Entry(carModelTypeEngine).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarModelTypeEngineExists(id))
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

        // POST: api/CarModelTypeEngines
        [ResponseType(typeof(CarModelTypeEngine))]
        public async Task<IHttpActionResult> PostCarModelTypeEngine(CarModelTypeEngine carModelTypeEngine)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CarModelTypeEngines.Add(carModelTypeEngine);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = carModelTypeEngine.Id }, carModelTypeEngine);
        }

        // DELETE: api/CarModelTypeEngines/5
        [ResponseType(typeof(CarModelTypeEngine))]
        public async Task<IHttpActionResult> DeleteCarModelTypeEngine(int id)
        {
            CarModelTypeEngine carModelTypeEngine = await db.CarModelTypeEngines.FindAsync(id);
            if (carModelTypeEngine == null)
            {
                return NotFound();
            }

            db.CarModelTypeEngines.Remove(carModelTypeEngine);
            await db.SaveChangesAsync();

            return Ok(carModelTypeEngine);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CarModelTypeEngineExists(int id)
        {
            return db.CarModelTypeEngines.Count(e => e.Id == id) > 0;
        }
    }
}