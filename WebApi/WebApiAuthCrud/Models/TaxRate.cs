using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApiAuthCrud.Models
{
    public class TaxRate
    {
        [Key]
        public string Id { get; set; }

        public int TaxRates { get; set; }

    }
}