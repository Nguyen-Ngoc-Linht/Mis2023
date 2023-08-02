using System;

namespace CommonLib.Interfaces
{
    /// <summary>
    /// 2018-12-23 11:03:49 ngocta2
    /// xu ly exception, thuongla ghi log
    /// </summary>
    public interface IErrorHandler
    {
        void WriteToFile(Exception ex);

        /// <summary>
        /// Log đoạn lỗi
        /// </summary>
        /// <param name="Messegae"></param>
        void WriteStringToFile(string SPname, string paramArr);
    }
}
