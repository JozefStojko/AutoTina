namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_ProductModel_Adding_2_Ids : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ProductModels", "CarMark_Id", "dbo.CarMarks");
            DropForeignKey("dbo.ProductModels", "CarModel_Id", "dbo.CarModels");
            DropIndex("dbo.ProductModels", new[] { "CarMark_Id" });
            DropIndex("dbo.ProductModels", new[] { "CarModel_Id" });
            RenameColumn(table: "dbo.ProductModels", name: "CarMark_Id", newName: "CarMarkId");
            RenameColumn(table: "dbo.ProductModels", name: "CarModel_Id", newName: "CarModelId");
            AlterColumn("dbo.ProductModels", "CarMarkId", c => c.Int(nullable: true));
            AlterColumn("dbo.ProductModels", "CarModelId", c => c.Int(nullable: true));
            CreateIndex("dbo.ProductModels", "CarModelId");
            CreateIndex("dbo.ProductModels", "CarMarkId");
            AddForeignKey("dbo.ProductModels", "CarMarkId", "dbo.CarMarks", "Id", cascadeDelete: false);
            AddForeignKey("dbo.ProductModels", "CarModelId", "dbo.CarModels", "Id", cascadeDelete: false);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProductModels", "CarModelId", "dbo.CarModels");
            DropForeignKey("dbo.ProductModels", "CarMarkId", "dbo.CarMarks");
            DropIndex("dbo.ProductModels", new[] { "CarMarkId" });
            DropIndex("dbo.ProductModels", new[] { "CarModelId" });
            AlterColumn("dbo.ProductModels", "CarModelId", c => c.Int());
            AlterColumn("dbo.ProductModels", "CarMarkId", c => c.Int());
            RenameColumn(table: "dbo.ProductModels", name: "CarModelId", newName: "CarModel_Id");
            RenameColumn(table: "dbo.ProductModels", name: "CarMarkId", newName: "CarMark_Id");
            CreateIndex("dbo.ProductModels", "CarModel_Id");
            CreateIndex("dbo.ProductModels", "CarMark_Id");
            AddForeignKey("dbo.ProductModels", "CarModel_Id", "dbo.CarModels", "Id");
            AddForeignKey("dbo.ProductModels", "CarMark_Id", "dbo.CarMarks", "Id");
        }
    }
}
