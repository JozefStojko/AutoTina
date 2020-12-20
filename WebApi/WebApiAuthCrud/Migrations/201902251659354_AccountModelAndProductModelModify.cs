namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AccountModelAndProductModelModify : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ProductTypeModels",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        ProductType = c.String(nullable: false),
                        ProductModel_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ProductModels", t => t.ProductModel_Id)
                .Index(t => t.ProductModel_Id);
            
            AddColumn("dbo.AccountModels", "CompanyName", c => c.String());
            AddColumn("dbo.AccountModels", "PIB", c => c.Int(nullable: false));
            AddColumn("dbo.AccountModels", "IdNumber", c => c.Int(nullable: false));
            AddColumn("dbo.AccountModels", "Phone", c => c.String());
            AddColumn("dbo.AccountModels", "ZipCode", c => c.Int(nullable: false));
            AddColumn("dbo.AccountModels", "City", c => c.String());
            AddColumn("dbo.AccountModels", "Address", c => c.String());
            AlterColumn("dbo.AccountModels", "Password", c => c.String(nullable: false));
            DropColumn("dbo.ProductModels", "ProductType");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ProductModels", "ProductType", c => c.String(nullable: false));
            DropForeignKey("dbo.ProductTypeModels", "ProductModel_Id", "dbo.ProductModels");
            DropIndex("dbo.ProductTypeModels", new[] { "ProductModel_Id" });
            AlterColumn("dbo.AccountModels", "Password", c => c.String());
            DropColumn("dbo.AccountModels", "Address");
            DropColumn("dbo.AccountModels", "City");
            DropColumn("dbo.AccountModels", "ZipCode");
            DropColumn("dbo.AccountModels", "Phone");
            DropColumn("dbo.AccountModels", "IdNumber");
            DropColumn("dbo.AccountModels", "PIB");
            DropColumn("dbo.AccountModels", "CompanyName");
            DropTable("dbo.ProductTypeModels");
        }
    }
}
