namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_id_string_to_int : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ProductModels", "ProductTypeModelId_Id", "dbo.ProductTypeModels");
            DropIndex("dbo.ProductModels", new[] { "ProductTypeModelId_Id" });
            DropPrimaryKey("dbo.ProductTypeModels");
            AlterColumn("dbo.ProductModels", "ProductTypeModelId_Id", c => c.Int());
            AlterColumn("dbo.ProductTypeModels", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.ProductTypeModels", "Id");
            CreateIndex("dbo.ProductModels", "ProductTypeModelId_Id");
            AddForeignKey("dbo.ProductModels", "ProductTypeModelId_Id", "dbo.ProductTypeModels", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProductModels", "ProductTypeModelId_Id", "dbo.ProductTypeModels");
            DropIndex("dbo.ProductModels", new[] { "ProductTypeModelId_Id" });
            DropPrimaryKey("dbo.ProductTypeModels");
            AlterColumn("dbo.ProductTypeModels", "Id", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("dbo.ProductModels", "ProductTypeModelId_Id", c => c.String(maxLength: 128));
            AddPrimaryKey("dbo.ProductTypeModels", "Id");
            CreateIndex("dbo.ProductModels", "ProductTypeModelId_Id");
            AddForeignKey("dbo.ProductModels", "ProductTypeModelId_Id", "dbo.ProductTypeModels", "Id");
        }
    }
}
