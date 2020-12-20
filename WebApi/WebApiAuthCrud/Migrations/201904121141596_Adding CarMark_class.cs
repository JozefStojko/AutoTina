namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingCarMark_class : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CarModels", "MarkId", c => c.Int(nullable: false));
            DropColumn("dbo.CarModels", "Mark");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CarModels", "Mark", c => c.String(nullable: false));
            DropColumn("dbo.CarModels", "MarkId");
        }
    }
}
