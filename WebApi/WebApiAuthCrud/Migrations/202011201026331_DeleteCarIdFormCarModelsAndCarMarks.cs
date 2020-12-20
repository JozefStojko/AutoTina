namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DeleteCarIdFormCarModelsAndCarMarks : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.CarModels", "CarId");
            DropColumn("dbo.CarMarks", "CarModelId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CarMarks", "CarModelId", c => c.Int(nullable: false));
            AddColumn("dbo.CarModels", "CarId", c => c.Int(nullable: false));
        }
    }
}
