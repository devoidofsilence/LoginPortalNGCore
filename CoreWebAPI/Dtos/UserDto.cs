namespace WebApi.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public bool Approved { get; set; }
        public bool IsAdmin { get; set; }
        public string Password { get; set; }
    }
}