using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CommonLib.Interfaces;
using CommonLib.Interfaces.Logger;
using CoreLib.Entities;
using CoreLib.Interfaces;
using Oracle.ManagedDataAccess.Client;

namespace CommonLib.Implementations
{
    public class COracleDataProvider : CErrorHandler, IDataProvider, IDisposable
    {
        // const
        public const int DEFAULT_PARAM_OUTPUT_CODE = -1;
        public const string DEFAULT_PARAM_OUTPUT_MSG = "out";

        private SqlDataAdapter _dataAdapter;
        private double _dblDuration;

        // props
        public string ConnectionString { get; set; }

        public IAppLogger AppLogger { get; }

        public ICommon Common { get; }

        private readonly List<OracleParameter> _requiredParams;

        public COracleDataProvider(ISerilogProvider serilogProvider, IErrorHandler errorHandler, IAppLogger appLogger, ICommon common)
            : base(serilogProvider)
        {
            AppLogger = appLogger;
            Common = common;
            this._requiredParams = new List<OracleParameter>();
        }

        public COracleDataProvider(ISerilogProvider serilogProvider) : base(serilogProvider)
        {
        }

        public SqlCommand Command { get; set; }

        public SqlConnection Connection { get; set; }

        public SqlDataReader DataReader { get; set; }

        public int ExecDuration => Convert.ToInt32(this._dblDuration);

        public DataSet GetDatasetFromSp(string sPname, IDbDataParameter[] paramArr, string connectionString)
        {
          
            try
            {
                var paramList = paramArr.ToList();
                paramList.Add(new OracleParameter()
                {
                    ParameterName = "RefCursor",
                    Direction = ParameterDirection.Output,
                    OracleDbType = OracleDbType.RefCursor,
                });
                if (this._requiredParams.Count > 0)
                {
                    this._requiredParams.ForEach(param => { paramList.Add(param); });

                    // sau khi add thì clear luôn , set chỉ dùng 1 lần
                    this._requiredParams.Clear();
                }

                paramArr = paramList.ToArray();

             
                var dataSet = OracleHelper.ExecuteDataset(connectionString, CommandType.StoredProcedure, sPname, paramArr);

             

                return dataSet;
            }
            catch (Exception e)
            {
                AppLogger.ErrorLogger.LogError(e);
            }

            return new DataSet();
        }

        public DataTable GetDataTableFromSP(string SPname, IDbDataParameter[] paramArr, string connectionString)
        {

            var dsData = this.GetDatasetFromSp(SPname, paramArr, connectionString);
            if (dsData.Tables.Count > 0)
            {
                return dsData.Tables[0];
            }
            return null;
        }

        public DataSet GetDatasetFromSpReturn2Out(string sPname, IDbDataParameter[] paramArr, string connectionString)
        {
           
            try
            {
                var paramList = paramArr.ToList();
                paramList.Add(new OracleParameter()
                {
                    ParameterName = "RefCursor",
                    Direction = ParameterDirection.Output,
                    OracleDbType = OracleDbType.RefCursor,
                });
                paramList.Add(new OracleParameter()
                {
                    ParameterName = "RefCursor1",
                    Direction = ParameterDirection.Output,
                    OracleDbType = OracleDbType.RefCursor,
                });
                if (this._requiredParams.Count > 0)
                {
                    this._requiredParams.ForEach(param => { paramList.Add(param); });

                    // sau khi add thì clear luôn , set chỉ dùng 1 lần
                    this._requiredParams.Clear();
                }

                paramArr = paramList.ToArray();

            
                var dataSet = OracleHelper.ExecuteDataset(connectionString, CommandType.StoredProcedure, sPname, paramArr);

              
                return dataSet;
            }
            catch (Exception e)
            {
                AppLogger.ErrorLogger.LogError(e);
            }

            return new DataSet();
        }

        /// <summary>
        /// sp phải có 1 sys_refcursor tên RefCursor
        /// Mặc định chỉ lấy ra 1 bảng dữ liệu, nếu lấy nhiều hơn 1 bảng thì phải define thêm sys_refcursor khác
        /// </summary>
        /// <param name="sPname"></param>
        /// <param name="paramArr"></param>
        /// <param name="connectionString"></param>
        /// <returns></returns>
        public async Task<DataSet> GetDatasetFromSpAsync(string sPname, IDbDataParameter[] paramArr, string connectionString)
        {
           
            try
            {
                
                var paramList = paramArr.ToList();
                paramList.Add(new OracleParameter()
                {
                    ParameterName = "RefCursor",
                    Direction = ParameterDirection.Output,
                    OracleDbType = OracleDbType.RefCursor,
                });
                if (this._requiredParams.Count > 0)
                {
                    this._requiredParams.ForEach(param => { paramList.Add(param); });

                    // sau khi add thì clear luôn , set chỉ dùng 1 lần
                    this._requiredParams.Clear();
                }

                paramArr = paramList.ToArray();

              
                var dataSet = await OracleHelper.ExecuteDatasetAsync(connectionString, CommandType.StoredProcedure, sPname, paramArr);

                return dataSet;
            }
            catch (Exception e)
            {
                AppLogger.ErrorLogger.LogError(e);
            }

            return new DataSet();
        }

        /// <summary>
        /// phải tự define RefCursor, có thể có nhiều RefCursor
        /// </summary>
        /// <param name="sPname"></param>
        /// <param name="paramArr"></param>
        /// <param name="connectionString"></param>
        /// <returns></returns>
        public async Task<DataSet> GetDatasetFromSpReturnMultiOutAsync(string sPname, IDbDataParameter[] paramArr, string connectionString)
        {
          
            try
            {
              
                var dataSet = await OracleHelper.ExecuteDatasetAsync(connectionString, CommandType.StoredProcedure, sPname, paramArr);

                return dataSet;
            }
            catch (Exception e)
            {
                AppLogger.ErrorLogger.LogError(e);
            }

            return new DataSet();
        }

        public bool ExecuteSp(string sPname, IDbDataParameter[] paramArr, string connectionString)
        {
           
            try
            {
                var paramList = paramArr.ToList();
                if (this._requiredParams.Count > 0)
                {
                    this._requiredParams.ForEach(param => { paramList.Add(param); });

                    // sau khi add thì clear luôn , set chỉ dùng 1 lần
                    this._requiredParams.Clear();
                }

                paramArr = paramList.ToArray();

                // Ghi log
                // tạo lại vì paramArray đã thay đổi
              var executionContext = AppLogger.CreatExecutionContext($"BEFORE:  {sPname}={Common.ParametersToString(paramArr)}", true);
                AppLogger.SqlLogger.LogSql(executionContext.Data);

                var result = OracleHelper.ExecuteNonQuery(connectionString, CommandType.StoredProcedure, sPname, paramArr);
                AppLogger.SqlLogger.LogSql(Common.GetResultInfo(result));


                return result > 0;
            }
            catch (Exception e)
            {
                AppLogger.ErrorLogger.LogError(e);
            }

            return false;
        }

        public async Task<bool> ExecuteSpAsync(string sPname, IDbDataParameter[] paramArr, string connectionString)
        {
           
            try
            {
                var paramList = paramArr.ToList();
                if (this._requiredParams.Count > 0)
                {
                    this._requiredParams.ForEach(param => { paramList.Add(param); });

                    // sau khi add thì clear luôn , set chỉ dùng 1 lần
                    this._requiredParams.Clear();
                }

                paramArr = paramList.ToArray();

                // Ghi log
                // tạo lại vì paramArray đã thay đổi
              var executionContext = AppLogger.CreatExecutionContext($"BEFORE:  {sPname}={Common.ParametersToString(paramArr)}", true);
                AppLogger.SqlLogger.LogSql(executionContext.Data);

                var result = await OracleHelper.ExecuteNonQueryAsync(connectionString, CommandType.StoredProcedure, sPname, paramArr);

                AppLogger.SqlLogger.LogSql(Common.GetResultInfo(result));

                return result > 0;
            }
            catch (Exception e)
            {
                AppLogger.ErrorLogger.LogError(e);
            }

            return false;
        }

        public CResponseMessage GetResponseFromExecutedSp(string sPname, IDbDataParameter[] paramArr, string connectionString)
        {
           
            var message = new OracleParameter()
            {
                ParameterName = "pmessage",
                OracleDbType = OracleDbType.Varchar2,
                Size = 200,
                Direction = ParameterDirection.Output,
            };
            var errorCode = new OracleParameter()
            {
                ParameterName = "perrorcode",
                OracleDbType = OracleDbType.Int32,
                Direction = ParameterDirection.Output,
            };

            var paramList = paramArr.ToList();
            paramList.Add(message);
            paramList.Add(errorCode);

            paramArr = paramList.ToArray();

            try
            {

                this.ExecuteSp(sPname, paramArr, connectionString);

                if (errorCode.Value != null && message.Value != null)
                {
                   

                    return new CResponseMessage()
                    {
                        Code = errorCode.Value.ToString(),
                        Message = message.Value.ToString(),
                    };
                }

                return new CResponseMessage("-1", "Không thể thực thi SP");
            }
            catch (Exception e)
            {
                AppLogger.ErrorLogger.LogError(e);

                return new CResponseMessage("-1", e.Message);
            }
        }

        public async Task<CResponseMessage> GetResponseFromExecutedSpAsync(string sPname, IDbDataParameter[] paramArr, string connectionString)
        {
            var message = new OracleParameter()
            {
                ParameterName = "pMessage",
                OracleDbType = OracleDbType.Varchar2,
                Size = 200,
                Direction = ParameterDirection.Output,
            };
            var errorCode = new OracleParameter()
            {
                ParameterName = "pErrorCode",
                OracleDbType = OracleDbType.Int32,
                Direction = ParameterDirection.Output,
            };

            var paramList = paramArr.ToList();
            paramList.Add(message);
            paramList.Add(errorCode);

            paramArr = paramList.ToArray();

            try
            {
                this.Logger.Debug("Before connect DB -> Store Procedure Name:" + sPname + " | Parameter:" + GetParamInfo(paramArr));

                await this.ExecuteSpAsync(sPname, paramArr, connectionString);

                if (errorCode.Value != null && message.Value != null)
                {
                    this.Logger.Debug("After connect DB -> Store Procedure Name:" + sPname + " | Parameter:" + GetParamInfo(paramArr));

                    return new CResponseMessage()
                    {
                        Code = errorCode.Value.ToString(),
                        Message = message.Value.ToString(),
                    };
                }

                return new CResponseMessage("-1", "Không thể thực thi SP");
            }
            catch (Exception e)
            {
                AppLogger.ErrorLogger.LogError(e);

                return new CResponseMessage("-1", e.Message);
            }
        }

        public IDbDataParameter CreateParameter(string parameterName, DbType dbType, object value)
        {
            return new OracleParameter()
            {
                ParameterName = parameterName,
                DbType = dbType,
                Value = value,
            };
        }


        public void Dispose()
        {
            Command?.Dispose();
            Connection?.Dispose();
            _dataAdapter?.Dispose();
            DataReader?.Dispose();
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// 2019-02-12 2:02:54 chiennd
        /// lay thong tin parma de ghi log sql
        /// </summary>
        /// <param name="dP"></param>
        /// <returns></returns>
        public string GetParamInfo(IDbDataParameter[] dP)
        {
            try
            {
                if (dP == null)
                {
                    return string.Empty;
                }

                var sb = new StringBuilder();
                foreach (var parameter in dP)
                {
                    if (parameter.Value == null) parameter.Value = "NULL";
                    sb.Append(parameter).Append("=").Append(parameter.Value).Append(" ");
                }

                return sb.ToString();
            }
            catch (Exception ex)
            {
                // log error
                this.WriteToFile(ex);
                return string.Empty;
            }
        }
 
    }
}
