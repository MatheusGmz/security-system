using ApplicationCore.Entities;
using ApplicationCore.Interfaces.User;
using System.Threading.Tasks;


namespace ApplicationCore.Services
{
    public class UsuarioService : IUserService
    {

        private readonly IUserRepository _userRepository;

        public UsuarioService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<Usuario> Provide(Usuario user)
        {
            return await _userRepository.AddAsync(user);
        }

        public async Task<Usuario> Authenticate(Usuario user)
        {
            return await _userRepository.GetByUser(user);
        }
        public async Task<Usuario> GetUsuarioByIdAsync(int id)
        {
            return await _userRepository.GetUsuarioByIdAsync(id);
        }

    }
}
