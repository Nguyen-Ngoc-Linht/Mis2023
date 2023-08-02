using System;
using System.Collections.Generic;
using System.Text;
using BaseDataLib.Implementations;
using CommonLib.Implementations;
using CommonLib.Interfaces;
using CoreLib.Interfaces;
//using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace DataServiceLib
{
    public static class IServiceCollectionExtension
    {
        public static IServiceCollection AddDataServices(this IServiceCollection services)
        {
            //DI TemplateDataContext                     
            
            services.AddTransient<ICBaseDataProvider, CBaseDataProvider>();
            return services;
        }
    }
}