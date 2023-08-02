using System;
using CommonLib.Interfaces.Logger;
using CommonLib.Model;
using Serilog;

namespace CommonLib.Implementations.Logger
{
    public class ErrorLogger : BaseLogger, IErrorLogger
    {
        private const string _templateErrorLog = @"=================
Message     = {0}
StackTrace  = {1}
TargetSite  = {2}";

        private const string _templateContext = @"=================
ContextId   = {0} ({1}) [{2}]
LastContext = {3}
Message     = {4}
StackTrace  = {5}
TargetSite  = {6}";

        public void LogError(Exception exception)
        {
            this.Logger.Error(
                _templateErrorLog,
                exception.Message,
                exception.StackTrace.TrimStart(),
                exception.TargetSite);
        }

        public void LogErrorContext(Exception exception, TExecutionContext context)
        {
            this.Logger.Error(
                _templateContext,
                context.Id,
                ThreadId,
                TaskId,
                context.LastContext + $" ; ec.Data={context.Data}",
                exception.Message,
                exception.StackTrace.TrimStart(),
                exception.TargetSite);
        }
        public void WriteStringToFile(string SPname, string paramArr)
        {
            string template = "\r\n-----SPname-----\r\n{0}\r\n-----paramArr ---\r\n{1}\r\n";
            this.Logger.Error(template, SPname, paramArr);
        }
        public ErrorLogger(ILogger logger)
            : base(logger)
        {
        }
    }
}