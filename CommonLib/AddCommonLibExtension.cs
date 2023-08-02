using System.Text;
using CommonLib.Implementations;
using CommonLib.Implementations.Logger;
using CommonLib.Interfaces;
using CommonLib.Interfaces.Logger;
using CoreLib.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace CommonLib
{
    // hiendv
    public static class AddCommonLibExtension
    {
        public static IServiceCollection AddCommonLib(this IServiceCollection services, IConfiguration configuration)
        {
            // new logger
            IInfoLogger infoLogger = new InfoLogger(LoggerFactory.CreateLogger(configuration, LoggerFactory.TYPE_FOLDER_INFO));
            IDebugLogger debugLogger = new DebugLogger(LoggerFactory.CreateLogger(configuration, LoggerFactory.TYPE_FOLDER_DEBUG));
            IErrorLogger errorLogger = new ErrorLogger(LoggerFactory.CreateLogger(configuration, LoggerFactory.TYPE_FOLDER_ERROR));
            ISqlLogger sqlLogger = new SqlLogger(LoggerFactory.CreateLogger(configuration, LoggerFactory.TYPE_FOLDER_SQL));

            services.AddSingleton(infoLogger);
            services.AddSingleton(debugLogger);
            services.AddSingleton(errorLogger);
            services.AddSingleton(sqlLogger);

            // instance chứa tất cả các loại log
            services.AddSingleton<IAppLogger, AppLogger>();

            // old logger
            ILogger serialog = new LoggerConfiguration()
                .WriteTo.File(configuration["LogFilePath"], encoding: Encoding.UTF8, rollingInterval: RollingInterval.Day)
                .CreateLogger();

            services.AddSingleton(configuration);
            services.AddSingleton(serialog);
            services.AddSingleton<ISerilogProvider, CSerilog>();
           // services.AddTransient<ICommon, CCommon>();
            services.AddTransient<IExcelService, ExcelService>();
            services.AddSingleton<IErrorHandler, CErrorHandler>();

            return services;
        }
    }
}
