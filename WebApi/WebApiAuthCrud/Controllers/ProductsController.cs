using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using WebApiAuthCrud.Models;

namespace WebApiAuthCrud.Controllers
{
    public class ProductsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Products
        [AllowAnonymous]
        public IQueryable<ProductModel> GetProducts()
        {
            IQueryable<ProductModel> productModels = db.ProductModels.Include(p => p.CarModelTypeEngine);

            productModels = productModels.Include(p => p.CarModelType);
            productModels = productModels.Include(p => p.CarModel);
            productModels = productModels.Include(p => p.CarMark);
            productModels = productModels.Include(p => p.ProductTypeModel);

            return productModels.OrderBy(x => x.CarMark.Mark);
        }

        [Route("api/Products/FilterByModel/{filter:int}")]

        public IQueryable<ProductModel> FilterByModel(int filter)

        {
            IQueryable<ProductModel> productModels = db.ProductModels.Include(p => p.CarModelTypeEngine);

            productModels = productModels.Include(p => p.CarModelType);
            productModels = productModels.Include(p => p.CarModel);
            productModels = productModels.Include(p => p.CarMark);
            productModels = productModels.Include(p => p.ProductTypeModel);


            if (filter != 0)
            {
                productModels = productModels.Where(p => p.CarMarkId == filter);
            }



            return productModels.OrderBy(x => x.CarMark.Mark).ThenBy(x => x.CarModel.Model).ThenBy(x => x.CarModelType.CarModelTypeName).ThenBy(x => x.CarModelTypeEngine.CarModelTypeEngineName);
        }

        // GET: FilterByProductType
        [Route("api/products/FilterByProductType/{productTypeId:int}")]
        [AllowAnonymous]
        public IQueryable<ProductModel> FilterByProductType(int productTypeId)

        {
            IQueryable<ProductModel> productModels = db.ProductModels.Include(p => p.ProductTypeModel);

            productModels = productModels.Include(p => p.CarModelTypeEngine);
            productModels = productModels.Include(p => p.CarModelType);
            productModels = productModels.Include(p => p.CarModel);
            productModels = productModels.Include(p => p.CarMark);


            // var festival = db.Fests.Include(p => p.Tickets);

            if (productTypeId != 0)
            {
                productModels = productModels.Where(p => p.ProductTypeModelId == productTypeId);
            }


            return productModels.OrderBy(x => x.ProductTypeModel.ProductType).ThenBy(x => x.CarMark.Mark).ThenBy(x => x.CarModel.Model).ThenBy(x => x.CarModelType.CarModelTypeName).ThenBy(x => x.CarModelTypeEngine.CarModelTypeEngineName);
            //return productModels;

        }

        // GET: api/Products/5
        [ResponseType(typeof(ProductModel))]
        public async Task<IHttpActionResult> GetProductModel(int id)
        {
            ProductModel productModel = await db.ProductModels.FindAsync(id);
            if (productModel == null)
            {
                return NotFound();
            }

            return Ok(productModel);
        }

        // PUT: api/Products/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutProductModel()
            {
            var httpRequest = HttpContext.Current.Request;

            string imageName = null;
            string productName = null;

            //Create id from productTypeId
            string idNameString = httpRequest.Params["ProductId"];

            int id = (int)Int64.Parse(idNameString);



            //Upload Image
            var postedFile = httpRequest.Files["ProductImage"];
            var postedImage = httpRequest.Params["ProductImage"];


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



            ProductModel productModel = new ProductModel()
            {
                Id = id,
                ProductTypeModelId = int.Parse(httpRequest.Params["ProductTypeId"]),
                CarModelTypeId = int.Parse(httpRequest.Params["CarModelTypeId"]),
                CarModelId = int.Parse(httpRequest.Params["CarTypeId"]),
                CarMarkId = int.Parse(httpRequest.Params["CarMarkId"]),
                CarModelTypeEngineId = int.Parse(httpRequest.Params["CarModelTypeEngineId"]),
                CatalogNumber = httpRequest.Params["CatalogNumber"],
                ProductName = httpRequest.Params["ProductName"],
                OnLager = int.Parse(httpRequest.Params["OnLager"]),
                Price = int.Parse(httpRequest.Params["Price"]),
                Description = httpRequest.Params["Description"],
                ComparativeNumbers = httpRequest.Params["ComparativeNumbers"],  
                Image = imageName
            };


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            db.Entry(productModel).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductModelExists(productModel.Id))
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

        // POST: api/Products
        [ResponseType(typeof(ProductModel))]
        public async Task<IHttpActionResult> PostProductModel()
        {

            string imageName = null;
            var httpRequest = HttpContext.Current.Request;
            //Upload Image
            var postedFile = httpRequest.Files["Image"];
            //Create custom filename
            imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
            var filePath = HttpContext.Current.Server.MapPath("~/image/" + imageName);
            postedFile.SaveAs(filePath);



            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ProductModel productModel = new ProductModel()
            {
                ProductTypeModelId = int.Parse(httpRequest.Params["ProductTypeId"]),
                CarModelTypeId = int.Parse(httpRequest.Params["CarModelTypeId"]),
                CarModelId = int.Parse(httpRequest.Params["CarTypeId"]),
                CarMarkId = int.Parse(httpRequest.Params["CarMarkId"]),
                CarModelTypeEngineId = int.Parse(httpRequest.Params["CarModelTypeEngineId"]),
                CatalogNumber = httpRequest.Params["CatalogNumber"],
                ProductName = httpRequest.Params["ProductName"],
                OnLager = int.Parse(httpRequest.Params["OnLager"]),
                Price = int.Parse(httpRequest.Params["Price"]),
                Image = imageName,
                Description = httpRequest.Params["Description"],
                ComparativeNumbers = httpRequest.Params["ComparativeNumbers"]
            };


            db.ProductModels.Add(productModel);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = productModel.Id }, productModel);
        }


        // DELETE: api/Products/5
        [ResponseType(typeof(ProductModel))]
        public async Task<IHttpActionResult> DeleteProductModel(int id)
        {
            ProductModel productModel = await db.ProductModels.FindAsync(id);
            if (productModel == null)
            {
                return NotFound();
            }

            //delete image
            string imageName = productModel.Image;
            var filePath = HttpContext.Current.Server.MapPath("~/image/" + imageName);
            File.Delete(filePath);


            db.ProductModels.Remove(productModel);
            await db.SaveChangesAsync();

            return Ok(productModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductModelExists(int id)
        {
            return db.ProductModels.Count(e => e.Id == id) > 0;
        }

    }
}