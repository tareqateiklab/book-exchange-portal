using System.ComponentModel.DataAnnotations;

namespace BookExchange.API.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;
        [StringLength(200)]
        public string? Description { get; set; }
        public virtual ICollection<Book> Books { get; set; } = new List<Book>();
    }
}