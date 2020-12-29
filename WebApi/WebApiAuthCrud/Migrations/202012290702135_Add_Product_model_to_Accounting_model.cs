namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Product_model_to_Accounting_model : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Accountings", "ProductModels_Id", c => c.Int());
            CreateIndex("dbo.Accountings", "ProductModels_Id");
            AddForeignKey("dbo.Accountings", "ProductModels_Id", "dbo.ProductModels", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Accountings", "ProductModels_Id", "dbo.ProductModels");
            DropIndex("dbo.Accountings", new[] { "ProductModels_Id" });
            DropColumn("dbo.Accountings", "ProductModels_Id");
        }
    }
}
