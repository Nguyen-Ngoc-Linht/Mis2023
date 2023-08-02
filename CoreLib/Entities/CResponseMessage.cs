using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CoreLib.Entities
{
    /// <summary>
    /// 1 sp tra ra
    /// + outuput param
    /// + data recordset 
    /// luu cac ket qua tra ra tu sp
    /// </summary>
    public class CResponseMessage
    {
       /// <summary>
       /// Mã lỗi
       /// </summary>
        public string Code;
        /// <summary>
        /// 
        /// </summary>
        public string Message;
        /// <summary>
        /// 
        /// </summary>
        public object Data;

        
        public CResponseMessage()
        {
        }

        public CResponseMessage(string code , string message)
        {
            this.Code = code;
            this.Message = message;
        }
    }
}
