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

        public string UserName { get; set; }
        public int ProductId { get; set; }
        public int NumberOfPiecesOfProduct { get; set; } //kolicina
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public string Car { get; set; }
        public DateTime? Date { get; set; } // datum izdavanja
        public string RegularAccountNumber { get; set; } // redni broj racuna
        
        public decimal? AmountOfBase { get; set; } // iznos osnovice;
        public decimal? AmountOfVAT { get; set; } // iznos PDV koji je obracunat na osnovicu;
        public decimal? PaymentAamount { get; set; } // iznos za placanje
        public TaxRate TaxRatess { get; set; } // poresku stopu koja se primenjuje;

        public ProductModel ProductModels { get; set; } // id robe
        public AccountModel AccountModels { get; set; } // podaci o kupcu


    }
}