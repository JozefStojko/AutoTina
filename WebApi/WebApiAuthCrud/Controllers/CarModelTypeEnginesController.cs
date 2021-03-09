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
        [AllowAnonymous]
        public IQueryable<CarModelTypeEngine> GetCarModelTypeEngines()
        {

            IQueryable<CarModelTypeEngine> carModelTypeEngines = db.CarModelTypeEngines.Include(p => p.CarModelType);

            carModelTypeEngines = carModelTypeEngines.Include(p => p.CarModelType.CarModel);
            carModelTypeEngines = carModelTypeEngines.Include(p => p.CarModelType.CarModel.CarMark);


            return carModelTypeEngines.OrderBy(p => p.CarModelType.CarModel.CarMark.Mark).ThenBy(x => x.CarModelType.CarModel.Model).ThenBy(x => x.CarModelType.CarModelTypeName).ThenBy(x => x.CarModelTypeEngineName);
        }



        // GET: api/CarModelTypeEngines/5
        [AllowAnonymous]
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

        // GET: GetcarmodeltypeenginesByCarModelTypeEngineIdSearch
        [AllowAnonymous]
        [Route("api/CarModelTypeEngines/GetCarModelTypeEnginesByCarModelTypeEngineIdSearch/{carModelTypeEngineId:int}")]
        public IQueryable<CarModelTypeEngine> GetCarModelTypeEnginesByCarModelTypeEngineIdSearch(int carModelTypeEngineId)
        {
            //var models = db.CarModels.Include(c => c.CarMark).Where(p => p.CarMark.Id.Contains(tip));

            //    SortTypes sortBy = SortTypeDict[sortType];

            IQueryable<CarModelTypeEngine> models = db.CarModelTypeEngines.Include(p => p.CarModelType);

            models = models.Where(p => p.CarModelTypeId == carModelTypeEngineId);

            //return db.CarModels;
            //return db.CarModels.Include(m => m.CarMark);
            return models.OrderBy(x => x.CarModelTypeEngineName);

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