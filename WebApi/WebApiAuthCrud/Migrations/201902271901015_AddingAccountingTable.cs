namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingAccountingTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Accountings",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Date = c.DateTime(),
                        RegularAccountNumber = c.String(),
                        Quantity = c.Int(nullable: false),
                        AmountOfBase = c.Decimal(precision: 18, scale: 2),
                        AmountOfVAT = c.Decimal(precision: 18, scale: 2),
                        PaymentAamount = c.Decimal(precision: 18, scale: 2),
                        AccountModels_Id = c.String(maxLength: 128),
                        ProductModels_Id = c.String(maxLength: 128),
                        TaxRatess_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AccountModels", t => t.AccountModels_Id)
                .ForeignKey("dbo.ProductModels", t => t.ProductModels_Id)
                .ForeignKey("dbo.TaxRates", t => t.TaxRatess_Id)
                .Index(t => t.AccountModels_Id)
                .Index(t => t.ProductModels_Id)
                .Index(t => t.TaxRatess_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Accountings", "TaxRatess_Id", "dbo.TaxRates");
            DropForeignKey("dbo.Accountings", "ProductModels_Id", "dbo.ProductModels");
            DropForeignKey("dbo.Accountings", "AccountModels_Id", "dbo.AccountModels");
            DropIndex("dbo.Accountings", new[] { "TaxRatess_Id" });
            DropIndex("dbo.Accountings", new[] { "ProductModels_Id" });
            DropIndex("dbo.Accountings", new[] { "AccountModels_Id" });
            DropTable("dbo.Accountings");
        }
    }
}
