namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Adding_yeras_propertie_to_CarModelType : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CarModelTypes", "YearFrom", c => c.Int(nullable: false));
            AddColumn("dbo.CarModelTypes", "YearTo", c => c.Int(nullable: false));
            DropColumn("dbo.CarModels", "YearFrom");
            DropColumn("dbo.CarModels", "YearTo");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CarModels", "YearTo", c => c.Int(nullable: false));
            AddColumn("dbo.CarModels", "YearFrom", c => c.Int(nullable: false));
            DropColumn("dbo.CarModelTypes", "YearTo");
            DropColumn("dbo.CarModelTypes", "YearFrom");
        }
    }
}
