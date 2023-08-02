using System.Data;
using System.Threading.Tasks;
using CoreLib.Entities;

namespace CommonLib.Interfaces
{
    /// <summary>
    /// 2019-02-12 12:58:49 chiennd
    /// truy xuat db, exec sp
    /// </summary>
    public interface IDataProvider
    {
        DataSet GetDatasetFromSp(string sPname, IDbDataParameter[] paramArr, string mConnectionString);

        DataTable GetDataTableFromSP(string SPname, IDbDataParameter[] paramArr, string connectionString);

        DataSet GetDatasetFromSpReturn2Out(string sPname, IDbDataParameter[] paramArr, string mConnectionString);

        Task<DataSet> GetDatasetFromSpAsync(string sPname, IDbDataParameter[] paramArr, string mConnectionString);

        Task<DataSet> GetDatasetFromSpReturnMultiOutAsync(string sPname, IDbDataParameter[] paramArr, string mConnectionString);

        bool ExecuteSp(string sPname, IDbDataParameter[] paramArr, string mConnectionString);

        Task<bool> ExecuteSpAsync(string sPname, IDbDataParameter[] paramArr, string mConnectionString);

        /// <summary>
        /// Thực thi sp ,
        /// SP tryền vào phải có 2 output parameter ,
        ///  @Message  nvarchar(200) output ,
        ///  @ErrorCode int output
        /// </summary>
        /// <param name="sPname">Tên SP</param>
        /// <param name="paramArr">Các para chứa dữ liệu</param>
        /// <param name="mConnectionString">Chuỗi kết nối</param>
        /// <returns>Respose gồm mã lỗi và message </returns>
        CResponseMessage GetResponseFromExecutedSp(string sPname, IDbDataParameter[] paramArr, string mConnectionString);

        Task<CResponseMessage> GetResponseFromExecutedSpAsync(string sPname, IDbDataParameter[] paramArr, string mConnectionString);

        IDbDataParameter CreateParameter(string parameterName, DbType dbType, object value);
    }
}
