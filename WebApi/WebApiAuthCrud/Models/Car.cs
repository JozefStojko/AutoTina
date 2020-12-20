using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApiAuthCrud.Models
{
    public class Car
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string CarName { get; set; }    

    }
}