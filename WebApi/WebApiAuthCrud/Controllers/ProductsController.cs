using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
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
            return db.ProductModels;
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
        [AllowAnonymous]
        [Route("api/products/GetProductsBySearch")]
        public IQueryable<ProductModel> GetProductsBySearch(string search, string sortType = "Naziv", int page = 1)
        {
            SortTypes sortBy = SortTypeDict[sortType];

            IQueryable<ProductModel> product = db.ProductModels.Include(p => p.Cars);

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

            if (!search.IsNullOrWhiteSpace())
            {
                product = product.Where(
                    p => p.ProductTypeModelId.ProductType.Contains(search) ||
                    p.CatalogNumber.ToString().Contains(search) ||
                    p.ProductName.Contains(search));
            }

            //ViewBag.sortTypes = new SelectList(SortTypeDict, "Key", "Key", sortType);
            //ViewBag.CurrentSortType = sortType;

            //return View(festival.ToPagedList(page, FestsPerPage));
            return product;
        }

        //[HttpPost]
        //public ActionResult Filter(Fest filter)
        //{

        //    var festival = db.Fests.Include(p => p.Tickets);

        //    if (filter.DateOfMaintenance != null)
        //    {
        //        festival = festival.Where(p => p.DateOfMaintenance == filter.DateOfMaintenance);
        //    }

        //    if (filter.MaxNumberOfVisitors != 0)
        //    {
        //        festival = festival.Where(p => p.MaxNumberOfVisitors == filter.MaxNumberOfVisitors);
        //    }

        //    if (filter.Name != null)
        //    {
        //        festival = festival.Where(p => p.Name == filter.Name);
        //    }

        //    if (filter.Place != null)
        //    {
        //        festival = festival.Where(p => p.Place == filter.Place);
        //    }
        //    if (filter.Rating != 0)
        //    {
        //        festival = festival.Where(p => p.Rating == filter.Rating);
        //    }


        //    return View(festival.ToList());
        //}


        // GET: api/Products/5
        [ResponseType(typeof(ProductModel))]
        public async Task<IHttpActionResult> GetProductModel(string id)
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
        public async Task<IHttpActionResult> PutProductModel(string id, ProductModel productModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //if (id != productModel.Id)
            //{
            //    return BadRequest();
            //}

            db.Entry(productModel).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductModelExists(id))
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
        public async Task<IHttpActionResult> PostProductModel(ProductModel productModel)
        {
            Random rnd = new Random();
            int length = 15;
            string charPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
            StringBuilder rs = new StringBuilder();

            while (length > 0)
            {
                rs.Append(charPool[(int)(rnd.NextDouble() * charPool.Length)]);
                length--;
            }
            productModel.Id = rs.ToString();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProductModels.Add(productModel);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductModelExists(productModel.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = productModel.Id }, productModel);
        }


        // DELETE: api/Products/5
        [ResponseType(typeof(ProductModel))]
        public async Task<IHttpActionResult> DeleteProductModel(string id)
        {
            ProductModel productModel = await db.ProductModels.FindAsync(id);
            if (productModel == null)
            {
                return NotFound();
            }

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

        private bool ProductModelExists(string id)
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