using System.ComponentModel.DataAnnotations.Schema;

namespace BookExchange.API.Models
{
    public class Author
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public virtual ICollection<Book> Books { get; set; } = new List<Book>();
    }
}