using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApiAuthCrud.Models
{
    public class ProductModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ProductTypeId { get; set; }

        [Required]
        public int CarModelTypeId { get; set; }

        [Required]
        public int CarModelTypeEngineId { get; set; }

        [Required]
        public string CatalogNumber { get; set; }

        [Required]
        public string ProductName { get; set; }

        [Required]
        public int OnLager { get; set; }

        [Required]
        public decimal Price { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }
        
        public string ComparativeNumbers { get; set; }

        public CarModelTypeEngine CarModelTypeEngine { get; set; }

        public CarModelType CarModelType { get; set; }
        
        public CarModel CarModel { get; set; }

        public CarMark CarMark { get; set; }

        public ProductTypeModel ProductTypeModel { get; set; }




    }
}