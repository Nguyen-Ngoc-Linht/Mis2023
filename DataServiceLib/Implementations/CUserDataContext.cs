using CommonLib.Implementations;
using CommonLib.Interfaces;
using CoreLib.Interfaces;
using Dapper;
using Microsoft.Extensions.Configuration;
using Serilog;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using CoreLib.Entities;
using CommonLib.Interfaces.Logger;
using CoreLib.Config;
using Oracle.ManagedDataAccess.Client;
using System.Collections.Generic;
using DataServiceLib.Interfaces;
using CoreLib.SharedKernel.DataTableToObject.Mapping;

namespace BaseDataLib.Implementations
 {
    public class CUserContext : IUserDataContext
    {
        private readonly IDataProvider _baseDataProvider;
        private readonly IErrorHandler _errorHandler;     
        private readonly string _connectionString;

        public CUserContext(IDataProvider baseDataProvider, IConfiguration config, IErrorHandler errorHandler)
        {
            this._baseDataProvider = baseDataProvider;
            _errorHandler = errorHandler;
            this._connectionString = config["ConnectionString"];
        }
        public IEnumerable<CUser> GetListCUser(int id)
        {
            IDbDataParameter[] dbParam =
            {
                _baseDataProvider.CreateParameter("pid", DbType.Int32, id),
            };

            var dataSet = this._baseDataProvider.GetDatasetFromSp(
                SPRoute.SPEZS_USERSLIST,
                dbParam, this._connectionString);
            return dataSet.ToListItem<CUser>();
        }

        public CResponseMessage InsertCUser(CUser CUser)
        {
            IDbDataParameter[] dbparam =
            {
                new OracleParameter()
                {
                    ParameterName = "pname",
                    OracleDbType = OracleDbType.Varchar2,
                    Value = CUser.Fullname,
                },
              
            };
            try
            {
                var cResult = this._baseDataProvider.GetResponseFromExecutedSp(SPRoute.SPEZS_USER_INSERT, dbparam, this._connectionString);

                return cResult;
            }
            catch (Exception e)
            {
                _errorHandler.WriteToFile(e);
                return new CResponseMessage("1", "Có lỗi xảy ra, không thể lưu");
            }
        }

        public CResponseMessage UpdateCUser(CUser CUser)
        {
            IDbDataParameter[] dbparam =
            {
                new OracleParameter()
                {
                    ParameterName = "pid",
                    OracleDbType = OracleDbType.Varchar2,
                    Value = CUser.Id,
                },
                new OracleParameter()
                {
                    ParameterName = "pname",
                    OracleDbType = OracleDbType.Varchar2,
                    Value = CUser.Fullname,
                }
            };
            try
            {
                var cResult = this._baseDataProvider.GetResponseFromExecutedSp(SPRoute.SPEZS_USER_UPDATE
                   , dbparam, this._connectionString);

                return cResult;
            }
            catch (Exception e)
            {
                _errorHandler.WriteToFile(e);
                return new CResponseMessage("1", "Có lỗi xảy ra, không thể lưu");
            }
        }

        public CResponseMessage DeleteCUser(int id)
        {
            IDbDataParameter[] dbparam =
            {
                new OracleParameter()
                {
                    ParameterName = "pid",
                    OracleDbType = OracleDbType.Varchar2,
                    Value = id,
                }
            };
            try
            {
                var cResult = this._baseDataProvider.GetResponseFromExecutedSp(SPRoute.SPEZS_USER_DELETE, dbparam, this._connectionString);

                return cResult;
            }
            catch (Exception e)
            {
                _errorHandler.WriteToFile(e);
                return new CResponseMessage("1", "Có lỗi xảy ra, không thể lưu");
            }
        }

    }
}
