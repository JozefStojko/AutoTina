namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Adding_CarModelType_model : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ProductModels", "CarModelId", "dbo.CarModels");
            DropIndex("dbo.ProductModels", new[] { "CarModelId" });
            RenameColumn(table: "dbo.ProductModels", name: "CarModelId", newName: "CarModel_Id");
            CreateTable(
                "dbo.CarModelTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CarModelTypeName = c.String(nullable: false),
                        CarModelId = c.Int(nullable: false),
                        CarMark_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CarMarks", t => t.CarMark_Id)
                .ForeignKey("dbo.CarModels", t => t.CarModelId, cascadeDelete: true)
                .Index(t => t.CarModelId)
                .Index(t => t.CarMark_Id);
            
            AddColumn("dbo.ProductModels", "CarModelTypeId", c => c.Int(nullable: false));
            AlterColumn("dbo.ProductModels", "CarModel_Id", c => c.Int());
            CreateIndex("dbo.ProductModels", "CarModelTypeId");
            CreateIndex("dbo.ProductModels", "CarModel_Id");
            AddForeignKey("dbo.ProductModels", "CarModelTypeId", "dbo.CarModelTypes", "Id", cascadeDelete: true);
            AddForeignKey("dbo.ProductModels", "CarModel_Id", "dbo.CarModels", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProductModels", "CarModel_Id", "dbo.CarModels");
            DropForeignKey("dbo.ProductModels", "CarModelTypeId", "dbo.CarModelTypes");
            DropForeignKey("dbo.CarModelTypes", "CarModelId", "dbo.CarModels");
            DropForeignKey("dbo.CarModelTypes", "CarMark_Id", "dbo.CarMarks");
            DropIndex("dbo.CarModelTypes", new[] { "CarMark_Id" });
            DropIndex("dbo.CarModelTypes", new[] { "CarModelId" });
            DropIndex("dbo.ProductModels", new[] { "CarModel_Id" });
            DropIndex("dbo.ProductModels", new[] { "CarModelTypeId" });
            AlterColumn("dbo.ProductModels", "CarModel_Id", c => c.Int(nullable: false));
            DropColumn("dbo.ProductModels", "CarModelTypeId");
            DropTable("dbo.CarModelTypes");
            RenameColumn(table: "dbo.ProductModels", name: "CarModel_Id", newName: "CarModelId");
            CreateIndex("dbo.ProductModels", "CarModelId");
            AddForeignKey("dbo.ProductModels", "CarModelId", "dbo.CarModels", "Id", cascadeDelete: true);
        }
    }
}
