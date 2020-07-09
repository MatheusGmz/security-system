using ApplicationCore.Entities;
using System.Collections.Generic;
namespace API.Controllers
{
    public class HttpReturn
    {
        public string Status { get; set; }

        public List<Sistema> Sistema { get; set; }
    }
}
