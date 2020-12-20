using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApiAuthCrud.Models
{
    public class CarModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int CarMarkId { get; set; }

        public string Model { get; set; }

        public int YearFrom { get; set; }

        public int YearTo { get; set; }


    }
}