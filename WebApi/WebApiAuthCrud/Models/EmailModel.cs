using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApiAuthCrud.Models
{
    public class EmailModel
    {
        [Required, Display(Name = "Auto Tina")]
        public string toname { get; set; }
        [Required, Display(Name = "sztojko.jozsef@gmail.com"), EmailAddress]
        public string To { get; set; }
        [Required]
        public string Cc { get; set; }

        [Required]
        public string Subject { get; set; }
        [Required]
        public string Message { get; set; }
    }
}