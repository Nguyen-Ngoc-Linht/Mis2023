using CommonLib.Model;

namespace CommonLib.Interfaces.Logger
{
    public interface IAppLogger
    {
        IInfoLogger InfoLogger { get; }

        IDebugLogger DebugLogger { get; set; }

        IErrorLogger ErrorLogger { get; set; }

        ISqlLogger SqlLogger { get; set; }

        TExecutionContext CreatExecutionContext(string data, bool force = false);
    }
}