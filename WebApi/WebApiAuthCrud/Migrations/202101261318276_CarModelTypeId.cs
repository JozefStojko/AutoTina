namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CarModelTypeId : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.CarModelTypeEngines", "CarModelTypeId", "dbo.CarModelTypes");
            DropIndex("dbo.CarModelTypeEngines", new[] { "CarModelTypeId" });
            RenameColumn(table: "dbo.CarModelTypeEngines", name: "CarModelTypeId", newName: "CarModelType_Id");
            AlterColumn("dbo.CarModelTypeEngines", "CarModelType_Id", c => c.Int());
            CreateIndex("dbo.CarModelTypeEngines", "CarModelType_Id");
            AddForeignKey("dbo.CarModelTypeEngines", "CarModelType_Id", "dbo.CarModelTypes", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CarModelTypeEngines", "CarModelType_Id", "dbo.CarModelTypes");
            DropIndex("dbo.CarModelTypeEngines", new[] { "CarModelType_Id" });
            AlterColumn("dbo.CarModelTypeEngines", "CarModelType_Id", c => c.Int(nullable: false));
            RenameColumn(table: "dbo.CarModelTypeEngines", name: "CarModelType_Id", newName: "CarModelTypeId");
            CreateIndex("dbo.CarModelTypeEngines", "CarModelTypeId");
            AddForeignKey("dbo.CarModelTypeEngines", "CarModelTypeId", "dbo.CarModelTypes", "Id", cascadeDelete: true);
        }
    }
}
