using CoreLib.Interfaces;
using Serilog;

namespace CommonLib.Interfaces
{
    /// <summary>
    /// Serilog Provider 
    /// </summary>
    public interface ISerilogProvider : ILogProvider
    {
        /// <summary>
        /// serilog instance (singleton)
        /// </summary>
        ILogger Logger { get; }      
    }
}
