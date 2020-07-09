using ApplicationCore.Entities;
using ApplicationCore.Interfaces.User;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repositories
{
    public class UsuarioRepository : EfRepository<Usuario>, IUserRepository
    {
        public UsuarioRepository(SquadraContext dbContext) : base(dbContext)
        {
        }

        public Task<Usuario> GetByIDAsync(int id)
        {
            return _dbContext.Usuario.Where(ac => ac.Id == id).FirstOrDefaultAsync();
        }
        public Task<Usuario> GetByUser(Usuario user)
        {
            return _dbContext.Usuario.Where(ac => ac.Username == user.Username && ac.Password == user.Password).FirstOrDefaultAsync();
        }

        public Task<Usuario> GetUsuarioByIdAsync(int id)
        {
            return _dbContext.Usuario.Where(ac => ac.Id == id).FirstOrDefaultAsync();
        }
    }
}
