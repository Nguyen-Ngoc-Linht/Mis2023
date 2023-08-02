using CommonLib.Model;

namespace CommonLib.Interfaces.Logger
{
    /// <summary>
    /// 2019-01-03 14:29:28 ngocta2
    /// </summary>
    public interface IDebugLogger
    {
        void LogDebug(string data);

        void LogDebugContext(TExecutionContext context, string data);
    }
}
