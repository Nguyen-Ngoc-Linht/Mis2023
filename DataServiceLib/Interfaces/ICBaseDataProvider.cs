using System;
using System.Data;
using System.Data.SqlClient;
using CoreLib.Entities;
using Dapper;
using Serilog;

namespace BaseDataLib.Implementations
{
    public interface ICBaseDataProvider
    {
        string m_ConnectionString { get; set; }
        string ConnectionString { get; set; }
        SqlParameterCollection Parameters { get; }
        SqlCommand Command { get; set; }
        SqlConnection Connection { get; set; }
        SqlDataReader DataReader { get; set; }
        int ExecDuration { get; }
        ILogger Logger { get; }

        /// <summary>
        /// 2019-02-12 2:02:54 chiennd
        /// lay thong tin parma de ghi log sql
        /// </summary>
        /// <param name="DP"></param>
        /// <returns></returns>
        string GetParamInfo(DynamicParameters DP);

        /// <summary>
        /// 2019-02-12 2:02:54 chiennd
        /// lay thong tin parma de ghi log sql
        /// </summary>
        /// <param name="DP"></param>
        /// <returns></returns>
        string GetParamInfo(IDbDataParameter[] DP);

        bool _OpenConnection(string _m_ConnectionString);
        void _CloseConnection();

        /// <summary>
        /// GetDatasetFromSP
        /// </summary>
        /// <param name="SPname">sp_selectDataset</param>
        /// <returns></returns>
        DataSet GetDatasetFromSP(string SPname, IDbDataParameter[] paramArr, string _m_ConnectionString);

        void WriteToFile(Exception ex);
    }
}