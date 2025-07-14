using BookExchange.API.Models;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    public DbSet<Book> Books { get; set; }
    public DbSet<Author> Authors { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<User> Users { get; set; }

    public void Seed()
    {
        if (!Users.Any())
        {
            Users.AddRange(new[]
            {
                new User { FirstName = "Alice", LastName = "Smith", Email = "alice@example.com", Phone = "555-1111" },
                new User { FirstName = "Bob", LastName = "Johnson", Email = "bob@example.com", Phone = "555-2222" }
            });
            SaveChanges();
        }
        if (!Categories.Any())
        {
            Categories.AddRange(new[]
            {
                new Category { Name = "Computer Science", Description = "Programming, algorithms, software engineering" },
                new Category { Name = "Mathematics", Description = "Calculus, statistics, discrete mathematics" },
                new Category { Name = "Business", Description = "Marketing, finance, management courses" }
            });
            SaveChanges();
        }
    }
}