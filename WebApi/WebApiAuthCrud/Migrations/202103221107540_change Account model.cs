namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeAccountmodel : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Accountings", "TaxRatess_Id", "dbo.TaxRates");
            DropIndex("dbo.Accountings", new[] { "TaxRatess_Id" });
            DropPrimaryKey("dbo.Accountings");
            AlterColumn("dbo.Accountings", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.Accountings", "Id");
            DropColumn("dbo.Accountings", "TaxRatess_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Accountings", "TaxRatess_Id", c => c.String(maxLength: 128));
            DropPrimaryKey("dbo.Accountings");
            AlterColumn("dbo.Accountings", "Id", c => c.String(nullable: false, maxLength: 128));
            AddPrimaryKey("dbo.Accountings", "Id");
            CreateIndex("dbo.Accountings", "TaxRatess_Id");
            AddForeignKey("dbo.Accountings", "TaxRatess_Id", "dbo.TaxRates", "Id");
        }
    }
}
