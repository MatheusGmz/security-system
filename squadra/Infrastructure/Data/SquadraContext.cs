using ApplicationCore.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class SquadraContext : DbContext
    {
        public SquadraContext(DbContextOptions<SquadraContext> options) : base(options)
        {
        }
        public DbSet<Sistema> Sistema { get; set; }
        public DbSet<AppConfig> AppConfig { get; set; }

        public DbSet<Usuario> Usuario { get; set; }
    }
}
