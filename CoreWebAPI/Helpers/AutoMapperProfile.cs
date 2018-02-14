using AutoMapper;
using CoreWebAPI.Dtos;
using CoreWebAPI.Entities;

namespace CoreWebAPI.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}