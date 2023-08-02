using System;
using System.Collections.Generic;
using System.Data;

namespace CoreLib.SharedKernel.DataTableToObject.Mapping
{
    /// <summary>
    ///
    /// </summary>
    public static class DataMapperExtentions
    {
        /// <summary>
        ///
        /// </summary>
        /// <typeparam name="T">Class</typeparam>
        /// <param name="dataSet"></param>
        /// <returns></returns>
        public static IEnumerable<T> ToListItem<T>(this DataSet dataSet)
            where T : class, new()
        {
            if (dataSet == null)
            {
                throw new ArgumentNullException(nameof(dataSet));
            }

            if (dataSet.Tables.Count > 1)
            {
                throw new Exception("Dataset must contain only 1 table to convert to collection");
            }

            if (dataSet.Tables.Count == 0)
            {
                return new List<T>();
            }

            var mapper = new DataNamesMapper<T>();
            return mapper.Map(dataSet.Tables[0]);
        }

        /// <summary>
        ///
        /// </summary>
        /// <typeparam name="T">Class</typeparam>
        /// <param name="dataTable"></param>
        /// <returns></returns>
        public static IEnumerable<T> ToListItem<T>(this DataTable dataTable)
            where T : class, new()
        {
            if (dataTable == null)
            {
                throw new ArgumentNullException(nameof(dataTable));
            }

            var mapper = new DataNamesMapper<T>();
            return mapper.Map(dataTable);
        }
    }
}
