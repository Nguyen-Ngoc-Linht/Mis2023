using CommonLib.Model;

namespace CommonLib.Interfaces.Logger
{
    /// <summary>
    /// 2019-03-06 17:18:56 ngocta2
    /// </summary>
    public interface IInfoLogger
    {
        void LogInfo(string data);

        void LogInfoContext(TExecutionContext context, string data);
    }
}
