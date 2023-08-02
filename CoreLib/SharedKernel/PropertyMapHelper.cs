using System;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;

namespace CoreLib.SharedKernel
{
    public static class PropertyMapHelper
    {
        public static void Map(Type type, DataRow row, PropertyInfo prop, object entity)
        {
            var columnNames = AttributeHelper.GetDataNames(type, prop.Name);
            columnNames.Add(prop.Name);

            foreach (var columnName in columnNames)
            {
                if (string.IsNullOrWhiteSpace(columnName) || !row.Table.Columns.Contains(columnName))
                {
                    continue;
                }

                var propertyValue = row[columnName];
                if (propertyValue == DBNull.Value)
                {
                    continue;
                }

                ParsePrimitive(prop, entity, row[columnName]);
                break;
            }
        }

        public static void MapDbParam(object entity, PropertyInfo prop, IDbDataParameter parameter)
        {
            var columnNames = AttributeHelper.GetDbParameterNames(entity.GetType(), prop.Name)
                                             .Where(columnName => !string.IsNullOrWhiteSpace(columnName)).ToList();

            // Mặc định sẽ lấy tên của thuộc tính làm tên param , nếu không có tên nào được đặt trong thuộc tính DbParameterNames
            // Thì tên này sẽ được dùng
            columnNames.Add(prop.Name);

            foreach (var columnName in columnNames)
            {
                parameter.ParameterName = columnName;
                parameter.Value = prop.GetValue(entity);
                ParseParameterPrimitvie(prop, parameter);
                break;
            }
        }

        public static bool ParseBoolean(object value)
        {
            if (value == null || value == DBNull.Value)
            {
                return false;
            }

            switch (value.ToString().ToLowerInvariant())
            {
                case "1":
                case "y":
                case "yes":
                case "true":
                case "True":
                    return true;

                default:
                    return false;
            }
        }

        private static void ParsePrimitive(PropertyInfo prop, object entity, object value)
        {
            if (prop.PropertyType == typeof(string))
            {
                prop.SetValue(entity, value.ToString().Trim(), null);
            }
            else if (prop.PropertyType == typeof(bool) || prop.PropertyType == typeof(bool?))
            {
                if (value == null)
                {
                    prop.SetValue(entity, null, null);
                }
                else
                {
                    prop.SetValue(entity, ParseBoolean(value.ToString()), null);
                }
            }
            else if (prop.PropertyType == typeof(long) || prop.PropertyType == typeof(long?))
            {
                if (value == null)
                {
                    prop.SetValue(entity, null, null);
                }
                else
                {
                    prop.SetValue(entity, long.Parse(value.ToString()), null);
                }
            }
            else if (prop.PropertyType == typeof(int) || prop.PropertyType == typeof(int?))
            {
                if (value == null)
                {
                    prop.SetValue(entity, null, null);
                }
                else
                {
                    prop.SetValue(entity, int.Parse(value.ToString()), null);
                }
            }
            else if (prop.PropertyType == typeof(decimal))
            {
                prop.SetValue(entity, decimal.Parse(value.ToString()), null);
            }
            else if (prop.PropertyType == typeof(double) || prop.PropertyType == typeof(double?))
            {
                var isValid = double.TryParse(value.ToString(), out _);
                if (isValid)
                {
                    prop.SetValue(entity, double.Parse(value.ToString()), null);
                }
            }
            else if (prop.PropertyType == typeof(DateTime) || prop.PropertyType == typeof(DateTime?))
            {
                var isValid = DateTime.TryParse(value.ToString(), out var date);
                if (isValid)
                {
                    prop.SetValue(entity, date, null);
                    return;
                }

                isValid = DateTime.TryParseExact(value.ToString(), "MMddyyyy", new CultureInfo("en-US"), DateTimeStyles.AssumeLocal, out date);
                if (isValid)
                {
                    prop.SetValue(entity, date, null);
                    return;
                }

                isValid = DateTime.TryParseExact(value.ToString(), "MM/dd/yyyy HH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out date);
                if (!isValid)
                {
                    return;
                }

                prop.SetValue(entity, date, null);
            }
            else if (prop.PropertyType == typeof(Guid))
            {
                var isValid = Guid.TryParse(value.ToString(), out var guid);
                if (isValid)
                {
                    prop.SetValue(entity, guid, null);
                }
                else
                {
                    isValid = Guid.TryParseExact(value.ToString(), "B", out guid);
                    if (isValid)
                    {
                        prop.SetValue(entity, guid, null);
                    }
                }
            }
            else if (prop.PropertyType == typeof(byte[]))
            {
                try
                {
                    var data = Encoding.ASCII.GetBytes(value.ToString());
                    prop.SetValue(entity, data, null);
                }
                catch
                {
                    // ignored
                }
            }
        }

        private static void ParseParameterPrimitvie(PropertyInfo prop, IDbDataParameter parameter)
        {
            if (prop.PropertyType == typeof(string))
            {
                parameter.DbType = DbType.String;
            }
            else if (prop.PropertyType == typeof(bool) || prop.PropertyType == typeof(bool?))
            {
                parameter.DbType = DbType.Boolean;
            }
            else if (prop.PropertyType == typeof(long))
            {
                parameter.DbType = DbType.Int64;
            }
            else if (prop.PropertyType == typeof(int) || prop.PropertyType == typeof(int?))
            {
                parameter.DbType = DbType.Int32;
            }
            else if (prop.PropertyType == typeof(decimal))
            {
                parameter.DbType = DbType.Decimal;
            }
            else if (prop.PropertyType == typeof(double) || prop.PropertyType == typeof(double?))
            {
                parameter.DbType = DbType.Double;
            }
            else if (prop.PropertyType == typeof(DateTime) || prop.PropertyType == typeof(DateTime?))
            {
                parameter.DbType = DbType.DateTime;
            }
            else if (prop.PropertyType == typeof(Guid))
            {
                parameter.DbType = DbType.Guid;
            }
            else if (prop.PropertyType == typeof(byte[]))
            {
                parameter.DbType = DbType.Binary;
            }
        }
    }
}
