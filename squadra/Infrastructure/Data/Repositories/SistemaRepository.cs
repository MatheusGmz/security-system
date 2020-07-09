using ApplicationCore.Interfaces.System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repositories
{
    public class SistemaRepository : EfRepository<ApplicationCore.Entities.Sistema>, ISistemaRepository
    {
        public SistemaRepository(SquadraContext dbContext) : base(dbContext)
        {
        }

        public Task<ApplicationCore.Entities.Sistema> GetSistemaByIdAsync(int id)
        {
            return _dbContext.Sistema.Where(ac => ac.Id == id).FirstOrDefaultAsync();
        }

        public Task<List<ApplicationCore.Entities.Sistema>> GetSistemaByDescription(string description)
        {
            return _dbContext.Sistema.Where(ac => ac.Descricao == description).ToListAsync();
        }

        public Task<List<ApplicationCore.Entities.Sistema>> GetSistemaByInitials(string initials)
        {
            return _dbContext.Sistema.Where(ac => ac.Sigla == initials).ToListAsync();
        }

        public Task<List<ApplicationCore.Entities.Sistema>> GetSistemaByEmail(string email)
        {
            return _dbContext.Sistema.Where(ac => ac.Email == email).ToListAsync();
        }

        public Task<List<ApplicationCore.Entities.Sistema>> GetSistemaByDescInitEmail(string description, string initials, string email)
        {
            return _dbContext.Sistema.Include(ac => ac.Descricao == description).Include(ac => ac.Sigla == initials).Include(ac => ac.Email == email).ToListAsync();
        }
    }
}
