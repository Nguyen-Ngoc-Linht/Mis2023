using CommonLib.Interfaces;
using CoreLib.Interfaces;
using Serilog;
using System;
using System.Collections.Generic;
using System.Text;
namespace CommonLib.Implementations
{
    public class CErrorHandler : IErrorHandler
    {
        // var
        private readonly ILogger _logger;

        // props
        public ILogger Logger { get { return this._logger; } }

        /// <summary>
        /// 2018-12-22 21:13:58 ngocta2
        /// contructor, lay conn string, logger instance
        /// </summary>
        /// <param name="strConnectionString"></param>
        public CErrorHandler(ISerilogProvider serilogProvider)
        {
            this._logger = serilogProvider.Logger;    
        }

        public void WriteToFile(Exception ex)
        {
            string template = "\r\n-----Message-----\r\n{0}\r\n-----Source ---\r\n{1}\r\n-----StackTrace ---\r\n{2}\r\n-----TargetSite ---\r\n{3}";
            this._logger.Error(template, ex.Message, ex.Source, ex.StackTrace, ex.TargetSite);
        }
        //log đoạn lỗi
        public void WriteStringToFile(string SPname, string paramArr)
        {
            string template = "\r\n-----SPname-----\r\n{0}\r\n-----paramArr ---\r\n{1}\r\n";
            this.Logger.Error(template, SPname, paramArr);
        }
    }
}
