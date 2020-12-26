namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingCarTypepropertietoCarType : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.CarModels", "Model", c => c.String(nullable: false));
            CreateIndex("dbo.CarModels", "CarMarkId");
            AddForeignKey("dbo.CarModels", "CarMarkId", "dbo.CarMarks", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CarModels", "CarMarkId", "dbo.CarMarks");
            DropIndex("dbo.CarModels", new[] { "CarMarkId" });
            AlterColumn("dbo.CarModels", "Model", c => c.String());
        }
    }
}
