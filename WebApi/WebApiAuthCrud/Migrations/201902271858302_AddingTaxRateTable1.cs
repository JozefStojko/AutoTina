namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingTaxRateTable1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TaxRates",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        TaxRates = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.TaxRates");
        }
    }
}
