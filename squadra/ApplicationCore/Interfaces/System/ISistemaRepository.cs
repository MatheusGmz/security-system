using ApplicationCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.System
{
    public interface ISistemaRepository : IAsyncRepository<Entities.Sistema>
    {
        Task<Sistema> GetSistemaByIdAsync(int id);

        Task<List<Sistema>> GetSistemaByDescription(string description);

        Task<List<Sistema>> GetSistemaByInitials(string initials);
        Task<List<Sistema>> GetSistemaByEmail(string email);

        Task<List<Sistema>> GetSistemaByDescInitEmail(string description, string initials, string email);
    }
}
