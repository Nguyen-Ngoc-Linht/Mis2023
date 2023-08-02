using CoreLib.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CommonLib.Interfaces
{
    /// <summary>
    /// 2019-03-08 22:01:18 chiennd
    /// kiem tra validate
    
    /// </summary>
    public interface IValidateApi
    {
        bool ValidateGetTabRatiosView(string lstStockCode, ref CResponseMessage CR);
        bool ValidateFinancial(string StockCode, string Language, string Type, ref CResponseMessage CR);
    }
}
