namespace WebApiAuthCrud.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingAccountModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AccountModels",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        UserName = c.String(),
                        Email = c.String(),
                        Password = c.String(),
                        FirstName = c.String(),
                        LastName = c.String(),
                        IsAdmin = c.Boolean(nullable: false),
                        LoggedOn = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.AccountModels");
        }
    }
}
