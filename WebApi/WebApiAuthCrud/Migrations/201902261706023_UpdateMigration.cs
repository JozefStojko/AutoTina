namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateMigration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.User", "CompanyName", c => c.String());
            AddColumn("dbo.User", "PIB", c => c.Int(nullable: false));
            AddColumn("dbo.User", "IdNumber", c => c.Int(nullable: false));
            AddColumn("dbo.User", "Phone", c => c.String());
            AddColumn("dbo.User", "ZipCode", c => c.Int(nullable: false));
            AddColumn("dbo.User", "City", c => c.String());
            AddColumn("dbo.User", "Address", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.User", "Address");
            DropColumn("dbo.User", "City");
            DropColumn("dbo.User", "ZipCode");
            DropColumn("dbo.User", "Phone");
            DropColumn("dbo.User", "IdNumber");
            DropColumn("dbo.User", "PIB");
            DropColumn("dbo.User", "CompanyName");
        }
    }
}
