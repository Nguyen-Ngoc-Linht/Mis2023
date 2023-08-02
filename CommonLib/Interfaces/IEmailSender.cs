using CoreLib.Entities;
using CoreLib.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace CommonLib.Implementations
{
    public interface IEmailSender
    {
        Task<CResponseMessage> SendEmailAsync(string email, string subject, string message, string sender, string mailServer, int port, string username, string password);

    }

  
}