using CoreLib.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace CommonLib.Interfaces
{
    public interface ICommon
    {
        string CreateMD5(string input);

        string GetDeepCaller();

        string GetCaller(int level = 2);

        string FormatDate(string strDateTime);

        DateTime ConvertStringFromNewsToDateTime(string strDateTime);

        byte[] ToByteArray<T>(T obj);

        T FromByteArray<T>(byte[] data);

        string SerializeObject(object objectToSerialize);

        string ParametersToString(IDbDataParameter[] paramArray);

        string GetResultInfo(DataSet dataSet);

        string GetResultInfo(int affectedRowCount);

        public string ReadFileToString(string strFullPath);

        int GetSafeInt<T>(T col);

        long GetSafeLong<T>(T col);

        float GetSafeFloat<T>(T col);

        double GetSafeDouble<T>(T col);

        decimal GetSafeDecimal<T>(T col);

        string GetSafeString<T>(T col);

        bool GetSafeBool<T>(T col);

        DateTime GetSafeDate<T>(T col);

        void MapProp(object sourceObj, object targetObj);

        bool IsValidMail(string emailaddress);

        bool HasSpecialChars(string yourString);

        Task<CResponseMessage> SaveFile(IFormFile file, string targetFolder, IHostingEnvironment hostingEnvironment, IConfiguration _configuration);
        DataTable ToDataTable<T>(List<T> items);
    }
}