using System.Collections.Generic;
using System.Data;
using CoreLib.Entities;
using Oracle.ManagedDataAccess.Client;

namespace DataServiceLib.Interfaces
{
   public interface IUserDataContext
    {
        IEnumerable<CUser> GetListCUser(int id);
        CResponseMessage InsertCUser(CUser cUser);
        CResponseMessage UpdateCUser(CUser cUser);
        CResponseMessage DeleteCUser(int id);
    }
}
