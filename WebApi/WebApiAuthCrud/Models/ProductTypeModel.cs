using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApiAuthCrud.Models
{
    public class ProductTypeModel
    {
        [Key]
        public int  Id { get; set; }

        [Required]
        public string ProductType { get; set; }
        
        public string ProductTypeImage { get; set; }
    }
}