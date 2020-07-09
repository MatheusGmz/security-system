using ApplicationCore.Entities;
using ApplicationCore.Interfaces.System;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class SistemaService : ISistemaService
    {
        private readonly ISistemaRepository _sistemaRepository;

        public SistemaService(ISistemaRepository sistemaRepository)
        {
            _sistemaRepository = sistemaRepository;
        }
        public async Task<Sistema> Provide(Sistema v_sistema)
        {
            try
            {
                if (v_sistema.Id != 0)
                {
                    var p_sistema = await _sistemaRepository.GetSistemaByIdAsync(v_sistema.Id);
                    p_sistema.DataCriacao = v_sistema.DataCriacao;
                    p_sistema.Descricao = v_sistema.Descricao;
                    p_sistema.Email = v_sistema.Email;
                    p_sistema.Sigla = v_sistema.Sigla;
                    p_sistema.Justificativa = v_sistema.Justificativa;
                    p_sistema.DataUltimaModificacao = DateTime.Now;
                    p_sistema.NovaJustificativa = v_sistema.NovaJustificativa;
                    p_sistema.Status = v_sistema.Status;
                    p_sistema.Url = v_sistema.Url;
                    return await _sistemaRepository.UpdateAsync(p_sistema);
                }
                else
                {
                    v_sistema.DataCriacao = DateTime.Now;
                    v_sistema.DataUltimaModificacao = DateTime.Now;
                } 
                return await _sistemaRepository.AddAsync(v_sistema);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }
        }

        public async Task<List<Sistema>> GetSystem(Sistema v_sistema)
        {
            if (v_sistema.Descricao != null && v_sistema.Email != null && v_sistema.Sigla != null)
            {
                return await _sistemaRepository.GetSistemaByDescInitEmail(v_sistema.Descricao, v_sistema.Sigla, v_sistema.Email);
            }
            else if (v_sistema.Descricao == null && v_sistema.Sigla == null)
            {
                return await _sistemaRepository.GetSistemaByEmail(v_sistema.Email);
            }
            else if (v_sistema.Descricao == null && v_sistema.Email == null)
            {
                return await _sistemaRepository.GetSistemaByInitials(v_sistema.Sigla);
            }
            else return await _sistemaRepository.GetSistemaByDescription(v_sistema.Descricao);
        }
    }
}
