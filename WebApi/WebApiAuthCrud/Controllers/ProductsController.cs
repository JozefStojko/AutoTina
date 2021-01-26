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

        public enum SortTypes
        {
            Name,
            NameDesc,
            MaxNumberOfVisitors,
            MaxNumberOfVisitorsDesc,
            Rating,
            RatingDesc,
            DateOfMaintenance,
            DateOfMaintenanceDesc

        };

        public static Dictionary<string, SortTypes> SortTypeDict = new Dictionary<string, SortTypes>
        {
            {"Naziv" , SortTypes.Name },
            {"Naziv Descending" , SortTypes.NameDesc },
            {"Broj posetilaca" , SortTypes.MaxNumberOfVisitors },
            {"Broj posetilaca Descending" , SortTypes.MaxNumberOfVisitorsDesc },
            {"Datum odrzavanja" , SortTypes.DateOfMaintenance },
            {"Datum odrzavanja Descending" , SortTypes.DateOfMaintenanceDesc }

        };

        // GET: GetProductsBySearch
        //[AllowAnonymous]
        //[Route("api/products/GetProductsBySearch")]
        //public IQueryable<ProductModel> GetProductsBySearch(string search, string sortType = "Naziv", int page = 1)
        //{
        //    SortTypes sortBy = SortTypeDict[sortType];

        //IQueryable<ProductModel> product = db.ProductModels.Include(p => p.Cars);

        //IQueryable<ProductModel> product = db.ProductModels;

        //switch (sortBy)
        //{
        //    case SortTypes.Name:
        //        festival = festival.OrderBy(x => x.Name);
        //        break;
        //    case SortTypes.NameDesc:
        //        festival = festival.OrderByDescending(x => x.Name);
        //        break;
        //    case SortTypes.MaxNumberOfVisitors:
        //        festival = festival.OrderBy(x => x.MaxNumberOfVisitors);
        //        break;
        //    case SortTypes.MaxNumberOfVisitorsDesc:
        //        festival = festival.OrderByDescending(x => x.MaxNumberOfVisitors);
        //        break;
        //    case SortTypes.DateOfMaintenance:
        //        festival = festival.OrderBy(x => x.DateOfMaintenance);
        //        break;
        //    case SortTypes.DateOfMaintenanceDesc:
        //        festival = festival.OrderByDescending(x => x.DateOfMaintenance);
        //        break;
        //}

        //if (!search.IsNullOrWhiteSpace())
        //{
        //    product = product.Where(
        //        p => p.ProductTypeModelId.ProductType.Contains(search) ||
        //        p.CatalogNumber.ToString().Contains(search) ||
        //        p.ProductName.Contains(search));
        //}

        //ViewBag.sortTypes = new SelectList(SortTypeDict, "Key", "Key", sortType);
        //ViewBag.CurrentSortType = sortType;

        //return View(festival.ToPagedList(page, FestsPerPage));
        //    return product;
        //}

        // GET: GetProductsFilterByModel
        //public ActionResult Filter(Product filterByMark)
        [Route("api/Products/FilterByModel/{filter:int}")]

        //public IQueryable<ProductModel> FilterByModel(ProductModel filter)
        public IQueryable<ProductModel> FilterByModel(int filter)

        {
            IQueryable<ProductModel> productModels = db.ProductModels.Include(p => p.CarModelTypeEngine);

            productModels = productModels.Include(p => p.CarModelType);
            productModels = productModels.Include(p => p.CarModel);
            productModels = productModels.Include(p => p.CarMark);
            productModels = productModels.Include(p => p.ProductTypeModel);


            // var festival = db.Fests.Include(p => p.Tickets);
            if (filter != 0)
            {
                productModels = productModels.Where(p => p.CarMarkId == filter);
            }


            //if (filter.CarMarkId != 0 & filter.CarModelId == 0 & filter.CarModelTypeId == 0 & filter.CarModelTypeEngineId == 0)
            //{
            //    productModels = productModels.Where(p => p.CarMarkId == filter.CarMarkId);
            //}

            //if (filter.CarMarkId != 0 & filter.CarModelId != 0 & filter.CarModelTypeId == 0 & filter.CarModelTypeEngineId == 0)
            //{
            //    productModels = productModels.Where(p => p.CarMarkId == filter.CarMarkId);
            //    productModels = productModels.Where(p => p.CarModelId == filter.CarModelId);
            //}

            //if (filter.CarMarkId != 0 & filter.CarModelId != 0 & filter.CarModelTypeId != 0 & filter.CarModelTypeEngineId == 0)
            //{
            //    productModels = productModels.Where(p => p.CarMarkId == filter.CarMarkId);
            //    productModels = productModels.Where(p => p.CarModelId == filter.CarModelId);
            //    productModels = productModels.Where(p => p.CarModelTypeId == filter.CarModelTypeId);

            //}

            //if (filter.CarMarkId != 0 & filter.CarModelId != 0 & filter.CarModelTypeId != 0 & filter.CarModelTypeEngineId != 0)
            //{
            //    productModels = productModels.Where(p => p.CarMarkId == filter.CarMarkId);
            //    productModels = productModels.Where(p => p.CarModelId == filter.CarModelId);
            //    productModels = productModels.Where(p => p.CarModelTypeId == filter.CarModelTypeId);
            //    productModels = productModels.Where(p => p.CarModelTypeEngineId == filter.CarModelTypeEngineId);

            //}

            return productModels.OrderBy(x => x.CarMark.Mark).ThenBy(x => x.CarModel.Model).ThenBy(x => x.CarModelType.CarModelTypeName).ThenBy(x => x.CarModelTypeEngine.CarModelTypeEngineName);
        }

        // GET: FilterByProductType
        //public ActionResult Filter(Product filterByMark)
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
            //idNameString = idNameString.Remove(0, 1);
            //idNameString = idNameString.Remove(idNameString.Length - 1);

            int id = (int)Int64.Parse(idNameString);



            //var product = httpRequest.Params["ProductName"];

            //if (product.Contains("Product"))
            //{
            //    productName = product.Remove(0, 9);
            //    productName = productName.Remove(productName.Length - 2);
            //}
            //else
            //{
            //    productName = product.Remove(0, 1);
            //    productName = productName.Remove(productName.Length - 1);
            //}


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


            //var catalogN = httpRequest.Params["catalogNumber"];
            //var catalogNumber = catalogN.Remove(0, 1);
            //catalogNumber = catalogNumber.Remove(catalogNumber.Length - 1);


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

        //public string GetRandomString()
        //{
        //    Random rnd = new Random();
        //    int length = 15;
        //    string charPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        //    StringBuilder rs = new StringBuilder();

        //    while (length > 0)
        //    {
        //        rs.Append(charPool[(int)(rnd.NextDouble() * charPool.Length)]);
        //        length--;
        //    }
        //    return rs.ToString();
        //}
    }
}