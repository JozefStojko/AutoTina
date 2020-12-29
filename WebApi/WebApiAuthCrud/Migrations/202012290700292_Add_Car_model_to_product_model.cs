namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Car_model_to_product_model : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.ProductModels", "CarModelId");
            AddForeignKey("dbo.ProductModels", "CarModelId", "dbo.CarModels", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProductModels", "CarModelId", "dbo.CarModels");
            DropIndex("dbo.ProductModels", new[] { "CarModelId" });
        }
    }
}
