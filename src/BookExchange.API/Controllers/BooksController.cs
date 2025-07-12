using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookExchange.API.Models;

namespace BookExchange.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BooksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _context.Books
                .Include(b => b.Authors)
                .Include(b => b.Category)
                .Include(b => b.Seller)
                .ToListAsync();
        }

        // GET: api/books/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(Guid id)
        {
            var book = await _context.Books
                .Include(b => b.Authors)
                .Include(b => b.Category)
                .Include(b => b.Seller)
                .FirstOrDefaultAsync(b => b.Id == id);

            if (book == null)
                return NotFound();

            return book;
        }

        // POST: api/books
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }

        // PUT: api/books/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(Guid id, Book book)
        {
            if (id != book.Id)
                return BadRequest();

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // DELETE: api/books/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(Guid id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
                return NotFound();

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Book>>> SearchBooks(
            [FromQuery] string? search = null,
            [FromQuery] int? categoryId = null)
        {
            var query = _context.Books
                .Include(b => b.Authors)
                .Include(b => b.Category)
                .Include(b => b.Seller)
                .AsQueryable();

            // Search by title, ISBN, or author name
            if (!string.IsNullOrEmpty(search))
            {
                var searchLower = search.ToLower();
                query = query.Where(b =>
                    b.Title.ToLower().Contains(searchLower) ||
                    b.ISBN.ToLower().Contains(searchLower) ||
                    b.Authors.Any(a =>
                        a.FirstName.ToLower().Contains(searchLower) ||
                        a.LastName.ToLower().Contains(searchLower)));
            }

            // Filter by category
            if (categoryId.HasValue && categoryId > 0)
            {
                query = query.Where(b => b.CategoryId == categoryId);
            }

            var books = await query.OrderBy(b => b.Title).ToListAsync();
            return Ok(books);
        }
        private bool BookExists(Guid id)
        {
            return _context.Books.Any(e => e.Id == id);
        }
    }
}