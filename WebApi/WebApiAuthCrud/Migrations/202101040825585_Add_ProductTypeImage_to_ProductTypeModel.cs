namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_ProductTypeImage_to_ProductTypeModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CarModelTypeEngines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CarModelTypeEngineName = c.String(nullable: false),
                        CarModelTypeId = c.Int(nullable: false),
                        CarMark_Id = c.Int(),
                        CarModel_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CarMarks", t => t.CarMark_Id)
                .ForeignKey("dbo.CarModels", t => t.CarModel_Id)
                .ForeignKey("dbo.CarModelTypes", t => t.CarModelTypeId, cascadeDelete: true)
                .Index(t => t.CarModelTypeId)
                .Index(t => t.CarMark_Id)
                .Index(t => t.CarModel_Id);
            
            AddColumn("dbo.ProductTypeModels", "ProductTypeImage", c => c.String());
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CarModelTypeEngines", "CarModelTypeId", "dbo.CarModelTypes");
            DropForeignKey("dbo.CarModelTypeEngines", "CarModel_Id", "dbo.CarModels");
            DropForeignKey("dbo.CarModelTypeEngines", "CarMark_Id", "dbo.CarMarks");
            DropIndex("dbo.CarModelTypeEngines", new[] { "CarModel_Id" });
            DropIndex("dbo.CarModelTypeEngines", new[] { "CarMark_Id" });
            DropIndex("dbo.CarModelTypeEngines", new[] { "CarModelTypeId" });
            DropColumn("dbo.ProductTypeModels", "ProductTypeImage");
            DropTable("dbo.CarModelTypeEngines");
        }
    }
}
