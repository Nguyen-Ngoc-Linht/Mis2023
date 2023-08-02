using System;
using System.Collections.Generic;
using System.Linq;
using CoreLib.SharedKernel.DataTableToObject.Attributes;
using CoreLib.SharedKernel.ObjectToDbParameters;

namespace CoreLib.SharedKernel
{
    public static class AttributeHelper
    {
        /// <summary>
        /// Lấy tên cột để mapping của thuộc tính.
        /// </summary>
        /// <param name="type"></param>
        /// <param name="propertyName"></param>
        /// <returns>datanames.</returns>
        public static List<string> GetDataNames(Type type, string propertyName)
        {
            // lấy attribute
            var property = type
                .GetProperty(propertyName)
                ?.GetCustomAttributes(false)
                .FirstOrDefault(x => x.GetType().Name == nameof(DataNamesAttribute));

            return property != null ? ((DataNamesAttribute)property).ValueNames : new List<string>();
        }

        public static List<string> GetDbParameterNames(Type type, string propertyName)
        {
            // lấy attribute
            var property = type
                .GetProperty(propertyName)
                ?.GetCustomAttributes(false)
                .FirstOrDefault(x => x.GetType().Name == nameof(DbParameterNamesAttribute));

            return property != null ? ((DbParameterNamesAttribute)property).ValueNames : new List<string>();
        }
    }
}
