using CoreLib.SharedKernel;
using System;
using System.Collections.Generic;
using System.Text;

namespace CoreLib.Entities
{

    public class AuthRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
    public class CJwt
    {
        public string token { get; set; }
        public string expiration { get; set; }
    }
}
