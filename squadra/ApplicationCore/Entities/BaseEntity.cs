using System;

namespace ApplicationCore.Entities
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public DateTime DataCriacao { get; set; }

        public DateTime DataUltimaModificacao { get; set; }
    }
}
