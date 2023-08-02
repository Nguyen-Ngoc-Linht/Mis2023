using CommonLib.Interfaces;
using CoreLib.Entities;
using DataServiceLib.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Mis2023.Models;
using System.Diagnostics;
using System.Text.RegularExpressions;

namespace Mis2023.Controllers
{
    public class UserController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IUserDataContext _dataProvider;

   
        public UserController(ILogger<HomeController> logger, IUserDataContext dataProvider)
        {
            _logger = logger;
            this._dataProvider = dataProvider;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult UserManagement(UserViewModel searchOptions, int userID)
        {
            ModelState.Clear();
            var viewModel = new UserViewModel();
            if (searchOptions.User == null)
            {
                searchOptions.User = new CUser();
            }
            viewModel.Users = _dataProvider.GetListCUser(userID);

            return Json(viewModel.User);
        }

        //[HttpPost]
      
        //public IActionResult SaveUser(UserManagementViewModel viewModel)
        //{
        //    viewModel.Users = dataProvider.GetListUserDTOs(new CInternalUser());
        //    if (!EzAuthorizeAttribute.isAccessed)
        //    {
        //        // Không có quyền truy cập: return luôn
        //        viewModel.FormMessage = CResponseMessage.ResponseMessageNonAccess();
        //        return Json(viewModel.FormMessage);
        //    }
        //    if (viewModel.User.Email != null)
        //    {
        //        string email = viewModel.User.Email;
        //        Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
        //        Match match = regex.Match(email);
        //        if (match.Success)
        //        {
        //            viewModel.User.Email = email;
        //        }
        //        else
        //        {
        //            return Json(new CResponseMessage { Code = "-1", Message = "Email không đúng định dạng!" });
        //        }
        //    }

        //    if (!ModelState.IsValid)
        //    {
        //        return Json(viewModel.FormMessage);
        //    }

        //    if (!CheckUsername(viewModel))
        //    {

        //        var responses = new CResponseMessage { Code = "-1", Message = "Username không đc để trống !" };

        //        return Json(responses);
        //    }

        //    viewModel.User.MemberID = 0; ////default cho type MemberID = 0; users created on EzS
        //    viewModel.FormMessage = this.dataProvider.SaveUser(viewModel.User);

        //    var response = new CResponseMessage { Code = viewModel.FormMessage.Code, Message = viewModel.FormMessage.Message };

        //    return Json(response);

        //}

        //[HttpPost]
      
        //public IActionResult UpdateUser(UserManagementViewModel viewModel)
        //{
        //    viewModel.Users = dataProvider.GetListUserDTOs(new CInternalUser());
        //    if (!EzAuthorizeAttribute.isAccessed)
        //    {
        //        // Không có quyền truy cập: return luôn
        //        viewModel.FormMessage = CResponseMessage.ResponseMessageNonAccess();
        //        return Json(viewModel.FormMessage);
        //    }

        //    if (!ModelState.IsValid)
        //    {
        //        return Json(viewModel.FormMessage);
        //    }

        //    if (!CheckUsername(viewModel))
        //    {
        //        var responses = new CResponseMessage { Code = "-1", Message = "Username không đc để trống !" };

        //        return Json(responses);
        //    }
        //    if (viewModel.User.Email != null)
        //    {
        //        string email = viewModel.User.Email;
        //        Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
        //        Match match = regex.Match(email);
        //        if (match.Success)
        //        {
        //            viewModel.User.Email = email;
        //        }
        //        else
        //        {
        //            return Json(new CResponseMessage { Code = "-1", Message = "Email không đúng định dạng!" });
        //        }
        //    }

        //    viewModel.FormMessage = this.dataProvider.UpdateUser(viewModel.User);

        //    var response = new CResponseMessage { Code = viewModel.FormMessage.Code, Message = viewModel.FormMessage.Message };

        //    return Json(response);
        //}

        //[EzAuthorize("UserManagement")]
        //public IActionResult EditUser(int userID)
        //{
        //    var viewModel = new UserManagementViewModel
        //    {
        //        // param là điều kiện tìm kiếm , new CInternalUser() là lấy tất cả
        //        Users = dataProvider.GetListUserDTOs(new CInternalUser()),
        //    };

        //    // lấy user theo userId trong list tất cả user đã lấy trong viewModel
        //    var userInDb = viewModel.Users.FirstOrDefault(x => x.User.Id == userID);
        //    if (userInDb == null)
        //    {
        //        viewModel.FormMessage = new CResponseMessage("1", "User không tồn tại");
        //    }
        //    else
        //    {
        //        viewModel.User = userInDb.User;
        //    }
        //    var response = new CResponseMessage { Code = viewModel.FormMessage.Code, Message = viewModel.FormMessage.Message };

        //    return Json(response);

        //}

    }
}