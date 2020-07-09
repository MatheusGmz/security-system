namespace ApplicationCore.Entities
{
    public class Usuario : BaseEntity
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Cargo { get; set; }
    }
}
