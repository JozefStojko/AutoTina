namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ProductModelModifyCarModelAdding : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CarModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Mark = c.String(nullable: false),
                        Model = c.String(),
                        YearFrom = c.Int(nullable: false),
                        YearTo = c.Int(nullable: false),
                        ProductModel_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ProductModels", t => t.ProductModel_Id)
                .Index(t => t.ProductModel_Id);
            
            AddColumn("dbo.ProductModels", "CatalogNumber", c => c.String(nullable: false));
            AddColumn("dbo.ProductModels", "Price", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.ProductModels", "Image", c => c.String());
            AddColumn("dbo.ProductModels", "Description", c => c.String());
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CarModels", "ProductModel_Id", "dbo.ProductModels");
            DropIndex("dbo.CarModels", new[] { "ProductModel_Id" });
            DropColumn("dbo.ProductModels", "Description");
            DropColumn("dbo.ProductModels", "Image");
            DropColumn("dbo.ProductModels", "Price");
            DropColumn("dbo.ProductModels", "CatalogNumber");
            DropTable("dbo.CarModels");
        }
    }
}
