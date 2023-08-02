using System.Collections.Generic;
using CoreLib.Entities;

namespace Mis2023.Models
{
    public class UserViewModel
    {
        public IEnumerable<CUser> Users { get; set; }

        public CUser User { get; set; }
      
   
        public UserViewModel()
        {
            User = new CUser()
            {
                Id = 0,
            };
        }
    }
}
