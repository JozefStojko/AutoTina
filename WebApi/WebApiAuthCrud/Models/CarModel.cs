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

        [Required]
        public string Model { get; set; }
        public CarMark CarMark { get; set; }


    }
}