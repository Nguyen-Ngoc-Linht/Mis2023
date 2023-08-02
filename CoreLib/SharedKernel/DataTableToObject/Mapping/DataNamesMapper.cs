using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using CoreLib.SharedKernel.DataTableToObject.Attributes;

namespace CoreLib.SharedKernel.DataTableToObject.Mapping
{
    /// <summary>
    /// Class map datatable thành list object hoặc datarow thành object
    /// Để map , Gán Attribute Datanames["Column name"] cho thuộc tính của entity tương ứng với cột trong bảng.
    /// </summary>
    /// <typeparam name="TEntity">Object</typeparam>
    public class DataNamesMapper<TEntity>
        where TEntity : class, new()
    {
        public TEntity Map(DataRow row)
        {
            var entity = new TEntity();
            return this.Map(row, entity);
        }

        public TEntity Map(DataRow row, TEntity entity)
        {
            var properties = typeof(TEntity).GetProperties()
                                              .Where(x => x.GetCustomAttributes(typeof(DataNamesAttribute), true).Any())
                                              .ToList();
            foreach (var prop in properties)
            {
                PropertyMapHelper.Map(typeof(TEntity), row, prop, entity);
            }

            return entity;
        }

        public IEnumerable<TEntity> Map(DataTable table)
        {
            var entities = new List<TEntity>();
            var properties = typeof(TEntity).GetProperties()
                                              .ToList();
            foreach (DataRow row in table.Rows)
            {
                var entity = Activator.CreateInstance<TEntity>();
                foreach (var prop in properties)
                {
                    PropertyMapHelper.Map(typeof(TEntity), row, prop, entity);
                }

                entities.Add(entity);
            }

            return entities;
        }
    }
}
