namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class change_in_product_model_from_string_to_in : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.ProductModels");
            AlterColumn("dbo.ProductModels", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.ProductModels", "Id");
        }
        
        public override void Down()
        {
            DropPrimaryKey("dbo.ProductModels");
            AlterColumn("dbo.ProductModels", "Id", c => c.String(nullable: false, maxLength: 128));
            AddPrimaryKey("dbo.ProductModels", "Id");
        }
    }
}
