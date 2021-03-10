namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeAccounModel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Accountings", "UserName", c => c.String());
            AddColumn("dbo.Accountings", "ProductId", c => c.Int(nullable: false));
            AddColumn("dbo.Accountings", "NumberOfPiecesOfProduct", c => c.Int(nullable: false));
            AddColumn("dbo.Accountings", "Productname", c => c.String());
            AddColumn("dbo.Accountings", "Price", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.Accountings", "Car", c => c.String());
            DropColumn("dbo.Accountings", "Quantity");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Accountings", "Quantity", c => c.Int(nullable: false));
            DropColumn("dbo.Accountings", "Car");
            DropColumn("dbo.Accountings", "Price");
            DropColumn("dbo.Accountings", "Productname");
            DropColumn("dbo.Accountings", "NumberOfPiecesOfProduct");
            DropColumn("dbo.Accountings", "ProductId");
            DropColumn("dbo.Accountings", "UserName");
        }
    }
}
