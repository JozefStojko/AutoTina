using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace WebApiAuthCrud.Models
{
    public class CarModelType
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string CarModelTypeName { get; set; }

        [Required]
        public int CarModelId { get; set; }

        [Required]
        public int YearFrom { get; set; }

        [Required]
        public int YearTo { get; set; }

        public CarModel CarModel { get; set; }
        public CarMark CarMark { get; set; }

    }
}