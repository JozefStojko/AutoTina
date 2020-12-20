namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingCarMark_CarName : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CarMarks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Mark = c.String(nullable: false),
                        Image = c.String(),
                        CarModelId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Cars",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CarName = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.CarModels", "CarMarkId", c => c.Int(nullable: false));
            AddColumn("dbo.CarModels", "CarId", c => c.Int(nullable: false));
            DropColumn("dbo.CarModels", "MarkId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CarModels", "MarkId", c => c.Int(nullable: false));
            DropColumn("dbo.CarModels", "CarId");
            DropColumn("dbo.CarModels", "CarMarkId");
            DropTable("dbo.Cars");
            DropTable("dbo.CarMarks");
        }
    }
}
