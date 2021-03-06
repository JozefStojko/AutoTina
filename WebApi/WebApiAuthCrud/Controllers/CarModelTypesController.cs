﻿using System;
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
    public class CarModelTypesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/CarModelTypes
        [AllowAnonymous]
        public IQueryable<CarModelType> GetCarModelTypes()
        {
            IQueryable<CarModelType> carModelType = db.CarModelTypes.Include(p => p.CarModel.CarMark);

            return carModelType.OrderBy(p => p.CarModel.CarMark.Mark).ThenBy(x => x.CarModel.Model).ThenBy(y => y.CarModelTypeName);

        }

        // GET: api/CarModelTypes/5
        [AllowAnonymous]
        [ResponseType(typeof(CarModelType))]
        public async Task<IHttpActionResult> GetCarModelType(int id)
        {
            CarModelType carModelType = await db.CarModelTypes.FindAsync(id);
            if (carModelType == null)
            {
                return NotFound();
            }

            return Ok(carModelType);
        }

        // GET: GetcarmodeltypeenginesByCarModelTypeEngineIdSearch
        [AllowAnonymous]
        [Route("api/CarModelTypes/GetCarModelTypesByCarModelTypeIdSearch/{carModelTypeId:int}")]
        public IQueryable<CarModelType> GetCarModelTypeEnginesByCarModelTypeEngineIdSearch(int carModelTypeId)
        {

            IQueryable<CarModelType> models = db.CarModelTypes.Include(p => p.CarModel);

            models = models.Where(p => p.CarModelId == carModelTypeId);

            return models.OrderBy(x => x.CarModelTypeName);

        }


        // PUT: api/CarModelTypes/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCarModelType(int id, CarModelType carModelType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != carModelType.Id)
            {
                return BadRequest();
            }

            db.Entry(carModelType).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarModelTypeExists(id))
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

        // POST: api/CarModelTypes
        [ResponseType(typeof(CarModelType))]
        public async Task<IHttpActionResult> PostCarModelType(CarModelType carModelType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CarModelTypes.Add(carModelType);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = carModelType.Id }, carModelType);
        }

        // DELETE: api/CarModelTypes/5
        [ResponseType(typeof(CarModelType))]
        public async Task<IHttpActionResult> DeleteCarModelType(int id)
        {
            CarModelType carModelType = await db.CarModelTypes.FindAsync(id);
            if (carModelType == null)
            {
                return NotFound();
            }

            db.CarModelTypes.Remove(carModelType);
            await db.SaveChangesAsync();

            return Ok(carModelType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CarModelTypeExists(int id)
        {
            return db.CarModelTypes.Count(e => e.Id == id) > 0;
        }
    }
}