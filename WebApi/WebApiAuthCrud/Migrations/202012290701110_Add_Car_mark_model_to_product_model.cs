namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Car_mark_model_to_product_model : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ProductModels", "CarMark_Id", c => c.Int());
            CreateIndex("dbo.ProductModels", "CarMark_Id");
            AddForeignKey("dbo.ProductModels", "CarMark_Id", "dbo.CarMarks", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProductModels", "CarMark_Id", "dbo.CarMarks");
            DropIndex("dbo.ProductModels", new[] { "CarMark_Id" });
            DropColumn("dbo.ProductModels", "CarMark_Id");
        }
    }
}
