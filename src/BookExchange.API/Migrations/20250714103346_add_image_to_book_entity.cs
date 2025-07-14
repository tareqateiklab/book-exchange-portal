using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookExchange.API.Migrations
{
    /// <inheritdoc />
    public partial class add_image_to_book_entity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageFileName",
                table: "Books",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageFileName",
                table: "Books");
        }
    }
}
