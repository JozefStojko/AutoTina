namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ProductTypeModelModify : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ProductTypeModels", "ProductModel_Id", "dbo.ProductModels");
            DropIndex("dbo.ProductTypeModels", new[] { "ProductModel_Id" });
            AddColumn("dbo.ProductModels", "ProductTypeModelId_Id", c => c.String(maxLength: 128));
            CreateIndex("dbo.ProductModels", "ProductTypeModelId_Id");
            AddForeignKey("dbo.ProductModels", "ProductTypeModelId_Id", "dbo.ProductTypeModels", "Id");
            DropColumn("dbo.ProductTypeModels", "ProductModel_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ProductTypeModels", "ProductModel_Id", c => c.String(maxLength: 128));
            DropForeignKey("dbo.ProductModels", "ProductTypeModelId_Id", "dbo.ProductTypeModels");
            DropIndex("dbo.ProductModels", new[] { "ProductTypeModelId_Id" });
            DropColumn("dbo.ProductModels", "ProductTypeModelId_Id");
            CreateIndex("dbo.ProductTypeModels", "ProductModel_Id");
            AddForeignKey("dbo.ProductTypeModels", "ProductModel_Id", "dbo.ProductModels", "Id");
        }
    }
}
