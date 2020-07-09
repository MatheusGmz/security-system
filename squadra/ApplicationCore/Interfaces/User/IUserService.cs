using ApplicationCore.Entities;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.User
{
    public interface IUserService
    {
        Task<Usuario> Provide(Usuario user);

        Task<Usuario> Authenticate(Usuario user);

        Task<Usuario> GetUsuarioByIdAsync(int id);
    }
}
