namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_ProductModel : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ProductModels", "ProductTypeModel_Id", "dbo.ProductTypeModels");
            DropIndex("dbo.ProductModels", new[] { "ProductTypeModel_Id" });
            RenameColumn(table: "dbo.ProductModels", name: "ProductTypeModel_Id", newName: "ProductTypeModelId");
            AlterColumn("dbo.ProductModels", "ProductTypeModelId", c => c.Int(nullable: true));
            CreateIndex("dbo.ProductModels", "ProductTypeModelId");
            AddForeignKey("dbo.ProductModels", "ProductTypeModelId", "dbo.ProductTypeModels", "Id", cascadeDelete: false);
            DropColumn("dbo.ProductModels", "ProductTypeId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ProductModels", "ProductTypeId", c => c.Int(nullable: true));
            DropForeignKey("dbo.ProductModels", "ProductTypeModelId", "dbo.ProductTypeModels");
            DropIndex("dbo.ProductModels", new[] { "ProductTypeModelId" });
            AlterColumn("dbo.ProductModels", "ProductTypeModelId", c => c.Int());
            RenameColumn(table: "dbo.ProductModels", name: "ProductTypeModelId", newName: "ProductTypeModel_Id");
            CreateIndex("dbo.ProductModels", "ProductTypeModel_Id");
            AddForeignKey("dbo.ProductModels", "ProductTypeModel_Id", "dbo.ProductTypeModels", "Id");
        }
    }
}
