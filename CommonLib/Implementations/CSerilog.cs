using CommonLib.Interfaces;
using Microsoft.Extensions.Configuration;
using Serilog;

namespace CommonLib.Implementations
{

    public class CSerilog : ISerilogProvider
    {
        private readonly ILogger _logger;

        public ILogger Logger { get { return this._logger; } }

        /// <summary>
        /// 2018-12-22 17:30:51 ngocta2
        /// constructor
        /// tao instance, thuong la dung singleton
        /// </summary>
        /// <param name="logger"></param>
        public CSerilog(IConfiguration configuration, ILogger logger)
        {
            if (logger == null)
            {
                if(configuration!=null)
                {
                    var serilog = new LoggerConfiguration()
                    .ReadFrom.Configuration(configuration)
                    .CreateLogger();
                    this._logger = serilog;
                }                
            }
            else
            {
                this._logger = logger;
            }

        }
    }
}
