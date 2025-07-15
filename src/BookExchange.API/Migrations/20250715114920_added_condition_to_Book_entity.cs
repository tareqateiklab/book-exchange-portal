using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookExchange.API.Migrations
{
    /// <inheritdoc />
    public partial class added_condition_to_Book_entity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Condition",
                table: "Books",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Condition",
                table: "Books");
        }
    }
}
