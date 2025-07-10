using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // DbSets will be added here later
    // public DbSet<Book> Books { get; set; }
    // public DbSet<Category> Categories { get; set; }
}