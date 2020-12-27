namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Set_tobackstring_to_int : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CarModels", "ProductModel_Id", c => c.String(maxLength: 128));
            CreateIndex("dbo.CarModels", "ProductModel_Id");
            AddForeignKey("dbo.CarModels", "ProductModel_Id", "dbo.ProductModels", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CarModels", "ProductModel_Id", "dbo.ProductModels");
            DropIndex("dbo.CarModels", new[] { "ProductModel_Id" });
            DropColumn("dbo.CarModels", "ProductModel_Id");
        }
    }
}
