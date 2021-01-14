using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
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
            return db.ProductTypeModels.OrderBy(x => x.ProductType);
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
        public async Task<IHttpActionResult> PutProductTypeModel()
        {

            var httpRequest = HttpContext.Current.Request;

            string imageName = null;
            string productTypeName = null;

            //Create id from productTypeId
            string idNameString = httpRequest.Params["productTypeId"];
            //idNameString = idNameString.Remove(0, 1);
            //idNameString = idNameString.Remove(idNameString.Length - 1);

            int idName = (int)Int64.Parse(idNameString);



            var productType = httpRequest.Params["productTypeName"];

            if (productType.Contains("productType"))
            {
                productTypeName = productType.Remove(0, 9);
                productTypeName = productTypeName.Remove(productTypeName.Length - 2);
            }
            else
            {
                productTypeName = productType.Remove(0, 1);
                productTypeName = productTypeName.Remove(productTypeName.Length - 1);
            }


            //Upload Image
            var postedFile = httpRequest.Files["productTypeImage"];
            var postedImage = httpRequest.Params["productTypeImage"];


            //Create custom filename
            if (postedFile != null)
            {

                imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
                imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
                var filePath = HttpContext.Current.Server.MapPath("~/image/" + imageName);
                postedFile.SaveAs(filePath);
            }
            else
            {
                imageName = postedImage.Remove(0, 1);
                imageName = imageName.Remove(imageName.Length - 1);
            }


            ProductTypeModel productTypeModel = new ProductTypeModel()
            {
                Id = idName,
                ProductType = productTypeName,
                ProductTypeImage = imageName
            };


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            db.Entry(productTypeModel).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductTypeModelExists(productTypeModel.Id))
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


        //[ResponseType(typeof(void))]
        //public async Task<IHttpActionResult> PutProductTypeModel(int id, ProductTypeModel productTypeModel)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != productTypeModel.Id)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(productTypeModel).State = EntityState.Modified;

        //    try
        //    {
        //        await db.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ProductTypeModelExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        // POST: api/ProductTypeModels

        [ResponseType(typeof(ProductTypeModel))]
        public async Task<IHttpActionResult> PostProductTypeModel()
        {
            string imageName = null;
            var httpRequest = HttpContext.Current.Request;
            //Upload Image
            var postedFile = httpRequest.Files["productTypeImage"];
            //Create custom filename
            imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
            var filePath = HttpContext.Current.Server.MapPath("~/image/" + imageName);
            postedFile.SaveAs(filePath);

            //var productType = httpRequest.Params["productTypeName"];
            //var productTypeName = productType.Remove(0, 1);
            //productTypeName = productTypeName.Remove(productTypeName.Length - 1);


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ProductTypeModel productTypeModel = new ProductTypeModel()
            {
                ProductType = httpRequest.Params["productTypeName"],
                ProductTypeImage = imageName
            };


            db.ProductTypeModels.Add(productTypeModel);
            await db.SaveChangesAsync();


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

            //delete image
            //string imageName = productTypeModel.ProductTypeImage;
            //var filePath = HttpContext.Current.Server.MapPath("~/image/" + imageName);
            //File.Delete(filePath);

            //delete image
            string imageName = productTypeModel.ProductTypeImage;
            var filePath = HttpContext.Current.Server.MapPath("~/image/" + imageName);
            File.Delete(filePath);


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