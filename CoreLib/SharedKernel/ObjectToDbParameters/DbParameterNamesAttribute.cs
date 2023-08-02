using System;
using System.Collections.Generic;
using System.Linq;

namespace CoreLib.SharedKernel.ObjectToDbParameters
{
    /// <summary>
    /// Tên của param truyền vào database
    /// Khi sử dụng phương thức automap param : ToDbParameters
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class DbParameterNamesAttribute : Attribute
    {
        public List<string> ValueNames { get; }

        public DbParameterNamesAttribute()
        {
            this.ValueNames = new List<string>();
        }

        public DbParameterNamesAttribute(params string[] valueNames)
        {
            this.ValueNames = valueNames.ToList();
        }
    }
}
