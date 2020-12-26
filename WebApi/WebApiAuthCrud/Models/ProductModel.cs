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
        public string Id { get; set; }

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

        //public IList<CarModel> Cars { get; set; }

        public ProductTypeModel ProductTypeModelId { get; set; }



    }
}