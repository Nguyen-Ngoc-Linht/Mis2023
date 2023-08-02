using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Oracle.ManagedDataAccess.Client;

namespace CoreLib.SharedKernel.ObjectToDbParameters
{
    public static class DbParameterNamesExtensions
    {
        /// <summary>
        /// Map những thuộc tính có attribute DbParameterNames thành list param
        /// HienDV
        /// </summary>
        /// <typeparam name="TDbParameter">Class parameter , với SQL server là SqlParameter, Oracle là OracleParameter</typeparam>
        /// <param name="entity"></param>
        /// <returns></returns>
        public static IDbDataParameter[] ToDbParameters<TDbParameter>(this object entity)
            where TDbParameter : IDbDataParameter, new()
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            var properties = entity.GetType().GetProperties()
                .Where(x => x.GetCustomAttributes(typeof(DbParameterNamesAttribute), true).Any())
                .ToList();
            var paramList = new List<IDbDataParameter>();
            foreach (var prop in properties)
            {
                var param = new TDbParameter();
                PropertyMapHelper.MapDbParam(entity, prop, param);
                ParseBooleanParam(param);
                paramList.Add(param);
            }

            return paramList.ToArray();
        }

        /// <summary>
        /// Chuyển value của boolean sang 0 và 1 nếu là oracle parameter
        /// </summary>
        /// <typeparam name="TDbParameter"></typeparam>
        /// <param name="parameter"></param>
        private static void ParseBooleanParam(IDbDataParameter parameter)
        {
            if (parameter is OracleParameter && parameter.DbType == DbType.Boolean)
            {
                parameter.DbType = DbType.Int32;
                parameter.Value = PropertyMapHelper.ParseBoolean(parameter.Value) ? 1 : 0;
            }
        }

        /// <summary>
        /// Map những thuộc tính có tên được truyền vào thành list param , chỉ map những trường có tên
        /// HienDV
        /// </summary>
        /// <typeparam name="TDbParameter">Class parameter , với SQL server là SqlParameter, Oracle là OracleParameter</typeparam>
        /// <param name="entity"></param>
        /// <param name="listParamNames">Tên các thuộc tính muốn truyền</param>
        /// <returns></returns>
        public static IDbDataParameter[] ToDbParameters<TDbParameter>(this object entity, params string[] listParamNames)
            where TDbParameter : IDbDataParameter, new()
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            var paramList = new List<IDbDataParameter>();
            foreach (var param in listParamNames)
            {
                var prop = entity.GetType().GetProperty(param);
                if (prop == null)
                {
                    throw new ArgumentException("Property doesn't exist in entity");
                }

                var paramDb = new TDbParameter();
                PropertyMapHelper.MapDbParam(entity, prop, paramDb);
                paramList.Add(paramDb);
            }

            return paramList.ToArray();
        }
    }
}
