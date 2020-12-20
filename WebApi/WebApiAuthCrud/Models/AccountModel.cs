using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApiAuthCrud.Models
{
    public class AccountModel
    {
        [Key]
        public string Id { get; set; }

        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
        public string CompanyName { get; set; }
        public int PIB { get; set; }
        public int IdNumber { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int ZipCode { get; set; }
        public string City { get; set; }
        public string Address { get; set; }

        public bool IsAdmin { get; set; }
        public string LoggedOn { get; set; }

    }
}