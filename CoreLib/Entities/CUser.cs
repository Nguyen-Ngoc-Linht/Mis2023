using CoreLib.SharedKernel.ObjectToDbParameters;
using DataTableToOject.Attributes;
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
    public class CUser
    {
        public int Id { get; set; }

        [DbParameterNames("pUserName")]
        [StringLength(50, ErrorMessage = "Username không vượt quá 50 ký tự")]

        //[RegularExpression(@"^[a-zA-Z0-9-\s]{1,100}$", ErrorMessage = "Username không chứa ký tự đặc biệt")]
        public string Username { get; set; }

        [DbParameterNames("pFullName")]
        //[RegularExpression(@"^[a-zA-Z\s]{1,100}$", ErrorMessage ="Tên không chứa ký tự đặc biệt")]
        [StringLength(100, ErrorMessage = "Fullname không vượt quá 100 ký tự")]
        public string Fullname { get; set; }


        [DbParameterNames("pDescription")]
        [StringLength(100, ErrorMessage = "Description không vượt quá 100 ký tự")]
        public string Description { get; set; }

        [DbParameterNames("MemberID")]
        public int? MemberID { get; set; }


        public string Phone { get; set; }


        public string TelExt { get; set; }


        public string Email { get; set; }


        public string Skype { get; set; }

        public bool Active { get; set; }
        public int Status { get; set; }
    }
}
