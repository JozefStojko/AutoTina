namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovingCarModelTypeId : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.CarModelTypeEngines", "CarModelType_Id", "dbo.CarModelTypes");
            DropIndex("dbo.CarModelTypeEngines", new[] { "CarModelType_Id" });
            RenameColumn(table: "dbo.CarModelTypeEngines", name: "CarModelType_Id", newName: "CarModelTypeId");
            AlterColumn("dbo.CarModelTypeEngines", "CarModelTypeId", c => c.Int(nullable: false));
            CreateIndex("dbo.CarModelTypeEngines", "CarModelTypeId");
            AddForeignKey("dbo.CarModelTypeEngines", "CarModelTypeId", "dbo.CarModelTypes", "Id", cascadeDelete: false);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CarModelTypeEngines", "CarModelTypeId", "dbo.CarModelTypes");
            DropIndex("dbo.CarModelTypeEngines", new[] { "CarModelTypeId" });
            AlterColumn("dbo.CarModelTypeEngines", "CarModelTypeId", c => c.Int());
            RenameColumn(table: "dbo.CarModelTypeEngines", name: "CarModelTypeId", newName: "CarModelType_Id");
            CreateIndex("dbo.CarModelTypeEngines", "CarModelType_Id");
            AddForeignKey("dbo.CarModelTypeEngines", "CarModelType_Id", "dbo.CarModelTypes", "Id");
        }
    }
}
