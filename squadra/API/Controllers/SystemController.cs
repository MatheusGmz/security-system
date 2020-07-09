using ApplicationCore.Entities;
using ApplicationCore.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [EnableCors("CorsPolicy")]
    public class SystemController : ControllerBase
    {

        private readonly ApplicationCore.Interfaces.System.ISistemaRepository _systemRepository;
        private readonly ApplicationCore.Interfaces.System.ISistemaService _systemService;
        private readonly ApplicationCore.Interfaces.User.IUserService _userService;
        public SystemController(ApplicationCore.Interfaces.System.ISistemaRepository systemRepository, 
                                ApplicationCore.Interfaces.System.ISistemaService systemService, 
                                ApplicationCore.Interfaces.User.IUserService userService)
        {
            _systemRepository = systemRepository;
            _systemService = systemService;
            _userService = userService;
        }

        [HttpPost]
        public async Task<HttpReturn> InsertSystem(Sistema p_system)
        {
            var result = new HttpReturn();
            var v_system = await _systemService.Provide(p_system);
            if (v_system != null)
                result.Status = "200";
            else result.Status = "400";
            return result;
        }

        [HttpGet]
        public async Task<HttpReturn> GetSystem(string descricao, string sigla, string email)
        {
            var result = new HttpReturn();
            var v_system = new Sistema();
            v_system.Descricao = descricao;
            v_system.Sigla = sigla;
            v_system.Email = email;
            result.Sistema = new List<Sistema>();
            var listsystem = await _systemService.GetSystem(v_system);
            if (listsystem != null)
            {
                result.Status = "200";
                result.Sistema = listsystem;
            }
            else result.Status = "400";
            return result;
        }

        [HttpGet]
        public async Task<HttpReturn> GetForEdit(int id)
        {
            //acrescentar o responsável pela alteração
            var http = new HttpReturn();
            var aux = new List<Sistema>();
            var sistema = await _systemRepository.GetSistemaByIdAsync(id);
            aux.Add(sistema);
            http.Sistema = aux;
            if (aux != null)
                http.Status = "200";
            else http.Status = "400";
            return http;
        }

        [HttpPut]
        public async Task<HttpReturn> UpdateSystem(int id, Sistema v_system)
        {
            var result = new HttpReturn();
            v_system.Id = id;
            var p_system = await _systemRepository.GetSistemaByIdAsync(id);
            v_system.DataUltimaModificacao = p_system.DataUltimaModificacao;
            v_system.DataCriacao = p_system.DataCriacao;
            v_system = await _systemService.Provide(v_system);
            if (v_system != null)
                result.Status = "200";
            else result.Status = "400";
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody]Usuario model)
        {
            TokenService _token = new TokenService();
            var user = _userService.Authenticate(model);
            if (user == null)
                return NotFound(new { message = "Usuário ou senha inválidos" });
            var token = _token.GenerateToken(user.Result);
            user.Result.Password = "";
            return new
            {
                user = user,
                token = token
            };
        }
    }
}
