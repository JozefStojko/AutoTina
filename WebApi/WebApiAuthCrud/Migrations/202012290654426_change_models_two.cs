namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class change_models_two : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.CarModels", "ProductModel_Id", "dbo.ProductModels");
            DropForeignKey("dbo.Accountings", "ProductModels_Id", "dbo.ProductModels");
            DropIndex("dbo.Accountings", new[] { "ProductModels_Id" });
            DropIndex("dbo.CarModels", new[] { "ProductModel_Id" });
            RenameColumn(table: "dbo.ProductModels", name: "ProductTypeModelId_Id", newName: "ProductTypeModel_Id");
            RenameIndex(table: "dbo.ProductModels", name: "IX_ProductTypeModelId_Id", newName: "IX_ProductTypeModel_Id");
            AddColumn("dbo.ProductModels", "ProductTypeId", c => c.Int(nullable: false));
            AddColumn("dbo.ProductModels", "CarModelId", c => c.Int(nullable: false));
            AddColumn("dbo.ProductModels", "ComparativeNumbers", c => c.String());
            DropColumn("dbo.Accountings", "ProductModels_Id");
            DropColumn("dbo.CarModels", "ProductModel_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CarModels", "ProductModel_Id", c => c.String(maxLength: 128));
            AddColumn("dbo.Accountings", "ProductModels_Id", c => c.String(maxLength: 128));
            DropColumn("dbo.ProductModels", "ComparativeNumbers");
            DropColumn("dbo.ProductModels", "CarModelId");
            DropColumn("dbo.ProductModels", "ProductTypeId");
            RenameIndex(table: "dbo.ProductModels", name: "IX_ProductTypeModel_Id", newName: "IX_ProductTypeModelId_Id");
            RenameColumn(table: "dbo.ProductModels", name: "ProductTypeModel_Id", newName: "ProductTypeModelId_Id");
            CreateIndex("dbo.CarModels", "ProductModel_Id");
            CreateIndex("dbo.Accountings", "ProductModels_Id");
            AddForeignKey("dbo.Accountings", "ProductModels_Id", "dbo.ProductModels", "Id");
            AddForeignKey("dbo.CarModels", "ProductModel_Id", "dbo.ProductModels", "Id");
        }
    }
}
