using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApiAuthCrud.Models
{
    public class CarModelTypeEngine
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string CarModelTypeEngineName { get; set; }

        [Required]
        public int CarModelTypeId { get; set; }


        public CarModel CarModel { get; set; }

        public CarMark CarMark { get; set; }

        public CarModelType CarModelType { get; set; }

    }
}