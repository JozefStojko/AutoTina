using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApiAuthCrud.Models
{
    public class CarMark
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Mark { get; set; }

        public string Image { get; set; }


    }
}