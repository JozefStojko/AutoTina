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
    public class CarModelsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/CarModels
        public IQueryable<CarModel> GetCarModels()
        {
            return db.CarModels;
        }

        // GET: api/CarModels/5
        [ResponseType(typeof(CarModel))]
        public async Task<IHttpActionResult> GetCarModel(int id)
        {
            CarModel carModel = await db.CarModels.FindAsync(id);
            if (carModel == null)
            {
                return NotFound();
            }

            return Ok(carModel);
        }

        // PUT: api/CarModels/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCarModel(int id, CarModel carModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != carModel.Id)
            {
                return BadRequest();
            }

            db.Entry(carModel).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarModelExists(id))
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

        // POST: api/CarModels
        [ResponseType(typeof(CarModel))]
        public async Task<IHttpActionResult> PostCarModel(CarModel carModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CarModels.Add(carModel);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = carModel.Id }, carModel);
        }

        // DELETE: api/CarModels/5
        [ResponseType(typeof(CarModel))]
        public async Task<IHttpActionResult> DeleteCarModel(int id)
        {
            CarModel carModel = await db.CarModels.FindAsync(id);
            if (carModel == null)
            {
                return NotFound();
            }

            db.CarModels.Remove(carModel);
            await db.SaveChangesAsync();

            return Ok(carModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CarModelExists(int id)
        {
            return db.CarModels.Count(e => e.Id == id) > 0;
        }
    }
}