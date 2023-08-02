using System;

namespace CoreLib.Interfaces
{
    /// <summary>
    /// 2018-12-22 12:18:25 ngocta2
    /// log cac action, request : gom thong tin ca server/client
    /// </summary>
    public interface ILogAction
    {
        string SessionID { get; set; }

        long UserID { get; set; }

        string Action { get; set; }

        string SQL { get; set; }

        string UserAgent { get; set; }

        string ServerIP { get; set; }

        string ClientIP { get; set; }

        DateTime DateCreate { get; set; }
    }
}
