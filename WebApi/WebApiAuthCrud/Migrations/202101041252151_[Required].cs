namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Required : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ProductModels", "CarModelTypeEngineId", c => c.Int(nullable: false));
            CreateIndex("dbo.ProductModels", "CarModelTypeEngineId");
            AddForeignKey("dbo.ProductModels", "CarModelTypeEngineId", "dbo.CarModelTypeEngines", "Id", cascadeDelete: false);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProductModels", "CarModelTypeEngineId", "dbo.CarModelTypeEngines");
            DropIndex("dbo.ProductModels", new[] { "CarModelTypeEngineId" });
            DropColumn("dbo.ProductModels", "CarModelTypeEngineId");
        }
    }
}
