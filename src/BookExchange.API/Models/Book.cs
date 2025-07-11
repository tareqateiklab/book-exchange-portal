using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookExchange.API.Models
{
    public class Book
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        [StringLength(200)]
        public required string Title { get; set; } 
        public virtual ICollection<Author> Authors { get; set; } = new List<Author>();
        [StringLength(20)]
        public string? ISBN { get; set; }
        [Required]
        [Range(0.01, 10000)]
        public decimal Price { get; set; }
        [StringLength(1000)]
        public string? Description { get; set; }
        public required Guid SellerId { get; set; }
        public virtual User? Seller { get; set; }
        public DateTime DatePosted { get; set; } = DateTime.UtcNow;
        public int? CategoryId { get; set; }
        public virtual Category? Category { get; set; }
    }
}