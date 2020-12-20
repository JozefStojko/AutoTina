namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingProductmodel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ProductModels",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        ProductName = c.String(nullable: false),
                        ProductType = c.String(nullable: false),
                        OnLager = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ProductModels");
        }
    }
}
