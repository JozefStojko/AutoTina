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
    public class CarMarksController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/CarMarks
        [AllowAnonymous]
        public IQueryable<CarMark> GetCarMarks()
        {
            return db.CarMarks.OrderBy(x => x.Mark);
        }

        // GET: api/CarMarks/5
        [AllowAnonymous]
        [ResponseType(typeof(CarMark))]
        public async Task<IHttpActionResult> GetCarMark(int id)
        {
            CarMark carMark = await db.CarMarks.FindAsync(id);
            if (carMark == null)
            {
                return NotFound();
            }

            return Ok(carMark);
        }

        // PUT: api/CarMarks/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCarMark()
        {

            var httpRequest = HttpContext.Current.Request;

            string imageName = null;
            string markName = null;

            //Create id from carMarkId
            string idNameString = httpRequest.Params["carMarkId"];
            idNameString = idNameString.Remove(0, 1);
            idNameString = idNameString.Remove(idNameString.Length - 1);

            int idName = (int)Int64.Parse(idNameString);


            var mark = httpRequest.Params["markName"];

            if (mark.Contains("mark"))
            {
                markName = mark.Remove(0, 9);
                markName = markName.Remove(markName.Length - 2);
            }
            else 
            {
                markName = mark.Remove(0, 1);
                markName = markName.Remove(markName.Length - 1);
            }


            //Upload Image
            var postedFile = httpRequest.Files["markImage"];
            var postedImage = httpRequest.Params["markImage"];


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
                //imageName = HttpContext.Current.Server.MapPath("~/image/") + imageName;
            }


            CarMark carMark = new CarMark()
            {
                Id = idName,
                Mark = markName,
                Image = imageName
            };


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }




            db.Entry(carMark).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarMarkExists(carMark.Id))
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




        // POST: api/CarMarks
        [ResponseType(typeof(CarMark))]
        public async Task<IHttpActionResult> PostCarMark()
        {
            string imageName = null;
            var httpRequest = HttpContext.Current.Request;
            //Upload Image
            var postedFile = httpRequest.Files["image"];
            //Create custom filename
            imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
            var filePath = HttpContext.Current.Server.MapPath("~/image/" + imageName);
            postedFile.SaveAs(filePath);

            var mark = httpRequest.Params["mark"];
            var markName = mark.Remove(0, 1);
            markName = markName.Remove(markName.Length - 1);


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CarMark carMark = new CarMark()
            {
                //Mark = httpRequest["mark"],
                Mark = markName,
                Image = imageName
            };


            db.CarMarks.Add(carMark);
            await db.SaveChangesAsync();


            return CreatedAtRoute("DefaultApi", new { id = carMark.Id }, carMark);
        }

        // DELETE: api/CarMarks/5
        [ResponseType(typeof(CarMark))]
        public async Task<IHttpActionResult> DeleteCarMark(int id)
        {
            CarMark carMark = await db.CarMarks.FindAsync(id);
            if (carMark == null)
            {
                return NotFound();
            }

            //delete image
            string imageName = carMark.Image;
            var filePath = HttpContext.Current.Server.MapPath("~/image/" + imageName);
            File.Delete(filePath);


            db.CarMarks.Remove(carMark);
            await db.SaveChangesAsync();

            return Ok(carMark);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CarMarkExists(int id)
        {
            return db.CarMarks.Count(e => e.Id == id) > 0;
        }
    }
}