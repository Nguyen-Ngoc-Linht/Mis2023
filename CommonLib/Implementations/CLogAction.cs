using CoreLib.Interfaces;
using CoreLib.SharedKernel;
using Microsoft.AspNetCore.Http;
using System;

namespace CommonLib.Implementations
{
    public class CLogAction : CBaseEntity, ILogAction
    {
        public string SessionID { get; set; }

        public long UserID { get; set; }

        public string Action { get; set; }

        public string SQL { get; set; }

        public string UserAgent { get; set; }

        public string ServerIP { get; set; }

        public string ClientIP { get; set; }

        public DateTime DateCreate { get; set; }

        public IHttpContextAccessor HttpContextAccessor { get; }

        /// <summary>
        /// 2018-12-22 17:13:20 ngocta2
        /// constructor
        /// </summary>
        /// <param name="httpContextAccessor"></param>
        public CLogAction(IHttpContextAccessor httpContextAccessor)
        {
            HttpContextAccessor = httpContextAccessor; // Request object

            this.ServerIP = httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString(); // IPv6
            this.ClientIP = httpContextAccessor.HttpContext.Connection.LocalIpAddress.ToString();  // IPv6
            this.UserAgent = httpContextAccessor.HttpContext.Request.Headers["User-Agent"].ToString();

            this.DateCreate = DateTime.Now; // now
        }
    }
}
