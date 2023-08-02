using System;
using CommonLib.Model;

namespace CommonLib.Interfaces.Logger
{
    /// <summary>
    /// 2019-01-03 14:29:28 ngocta2
    /// </summary>
    public interface IErrorLogger
    {
        void LogError(Exception exception);

        void LogErrorContext(Exception exception, TExecutionContext context);

        /// <summary>
        /// Log đoạn lỗi
        /// </summary>
        /// <param name="Messegae"></param>
        void WriteStringToFile(string SPname, string paramArr);

    }
}
