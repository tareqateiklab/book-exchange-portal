
using System.ComponentModel.DataAnnotations.Schema;

namespace BookExchange.API.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)    ]
        public Guid Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Email { get; set; }
        public string? Phone { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public virtual ICollection<Book> Books { get; set; } = new List<Book>();
    }
}