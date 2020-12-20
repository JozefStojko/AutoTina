namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InCarModelTheTypeFromIntToString : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Cars", "CarName", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Cars", "CarName", c => c.Int(nullable: false));
        }
    }
}
