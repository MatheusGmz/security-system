using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.Entities
{
    public class Sistema : BaseEntity
    {
        public string Descricao { get; set; }
        public string Sigla { get;set;}

        [EmailAddress(ErrorMessage= "Insira um e-mail válido")]
        public string Email { get; set; }
        public string Url { get; set; }
        public bool Status { get; set; }
        public string Justificativa { get; set; }
        public string NovaJustificativa { get; set; }
    }
}
