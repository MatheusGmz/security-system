using ApplicationCore.Entities;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.User
{
    public interface IUserRepository : IAsyncRepository<Entities.Usuario>
    {
        Task<Usuario> GetByIDAsync(int id);

        Task<Usuario> GetByUser(Usuario user);

        Task<Usuario> GetUsuarioByIdAsync(int id);
    }
}
