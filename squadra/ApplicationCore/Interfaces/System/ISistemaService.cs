using ApplicationCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces.System
{
    public interface ISistemaService
    {
        Task<Sistema> Provide(Sistema sistema);

        Task<List<Sistema>> GetSystem(Sistema sistema);

    }
}
