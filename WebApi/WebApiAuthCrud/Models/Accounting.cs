using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApiAuthCrud.Models
{
    public class Accounting
    {
        [Key]
        public string Id { get; set; }

        public AccountModel AccountModels { get; set; } // podaci o kupcu
        public DateTime? Date { get; set; } // datum izdavanja
        public string RegularAccountNumber { get; set; } // redni broj racuna
        public ProductModel ProductModels { get; set; } // id robe
        public int Quantity { get; set; } // kolicina
        public decimal? AmountOfBase { get; set; } // iznos osnovice;
        public TaxRate TaxRatess { get; set; } // poresku stopu koja se primenjuje;
        public decimal? AmountOfVAT { get; set; } // iznos PDV koji je obracunat na osnovicu;
        public decimal? PaymentAamount { get; set; } // iznos za placanje

    }
}