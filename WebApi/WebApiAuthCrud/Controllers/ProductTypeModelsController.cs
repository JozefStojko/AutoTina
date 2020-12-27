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
    public class ProductTypeModelsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/ProductTypeModels
        [AllowAnonymous]
        public IQueryable<ProductTypeModel> GetProductTypeModels()
        {
            return db.ProductTypeModels;
        }

        // GET: api/ProductTypeModels/5
        [ResponseType(typeof(ProductTypeModel))]
        public async Task<IHttpActionResult> GetProductTypeModel(int id)
        {
            ProductTypeModel productTypeModel = await db.ProductTypeModels.FindAsync(id);
            if (productTypeModel == null)
            {
                return NotFound();
            }

            return Ok(productTypeModel);
        }

        // PUT: api/ProductTypeModels/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutProductTypeModel(int id, ProductTypeModel productTypeModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != productTypeModel.Id)
            {
                return BadRequest();
            }

            db.Entry(productTypeModel).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductTypeModelExists(id))
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

        // POST: api/ProductTypeModels
        [ResponseType(typeof(ProductTypeModel))]
        public async Task<IHttpActionResult> PostProductTypeModel(ProductTypeModel productTypeModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProductTypeModels.Add(productTypeModel);
            await db.SaveChangesAsync();


            //try
            //{
            //    await db.SaveChangesAsync();
            //}
            //catch (DbUpdateException)
            //{
            //    if (ProductTypeModelExists(productTypeModel.Id))
            //    {
            //        return Conflict();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            return CreatedAtRoute("DefaultApi", new { id = productTypeModel.Id }, productTypeModel);
        }

        // DELETE: api/ProductTypeModels/5
        [ResponseType(typeof(ProductTypeModel))]
        public async Task<IHttpActionResult> DeleteProductTypeModel(int id)
        {
            ProductTypeModel productTypeModel = await db.ProductTypeModels.FindAsync(id);
            if (productTypeModel == null)
            {
                return NotFound();
            }

            db.ProductTypeModels.Remove(productTypeModel);
            await db.SaveChangesAsync();

            return Ok(productTypeModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductTypeModelExists(int id)
        {
            return db.ProductTypeModels.Count(e => e.Id == id) > 0;
        }
    }
}