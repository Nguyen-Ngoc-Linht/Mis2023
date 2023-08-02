using CommonLib.Interfaces;
using CoreLib.Entities;
using CoreLib.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace CommonLib.Implementations
{
    /// <summary>
    /// Config của service gửi mail.
    /// </summary>
    /// <summary>
    ///     Service gửi mail implementation.
    /// </summary>
    public class CEmailSender : IEmailSender
    {
        private readonly IConfiguration _configuration;
        private readonly IErrorHandler _errorHandler;
        private readonly byte[] file;

        /// <summary>
        /// Initializes a new instance of the <see cref="EmailSender"/> class.
        ///     contructor.
        /// </summary>
        public CEmailSender(IErrorHandler errorHandler, IConfiguration configuration)
        {
            this._configuration = configuration;
            this._errorHandler = errorHandler;
        }

        /// <summary>
        ///     Gửi email.
        /// </summary>
        /// <param name="email">địa chỉ gửi tới.</param>
        /// <param name="subject">Tiêu đề.</param>
        /// <param name="message">Nội dung.</param>
        /// <returns></returns>
        public async Task<CResponseMessage> SendEmailAsync(string email, string subject, string message, string sender, string mailServer, int port, string username, string password)
        {
            return await Task.Run(() =>
            {
                try
                {
                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(sender, sender),
                        Subject = subject,
                        To = { new MailAddress(email) },
                        Body = message,
                    };

                    mailMessage.BodyEncoding = Encoding.UTF8;
                    mailMessage.IsBodyHtml = true;

                    using (var client = new SmtpClient(mailServer, port))
                    {
                        client.Credentials = new NetworkCredential(username, password);
                        client.Send(mailMessage);

                        return new CResponseMessage { Code = "0", Message = "SEND_EMAIL_SUCCESS" };
                    }
                }
                catch (Exception ex)
                {
                    this._errorHandler.WriteToFile(ex);
                    return new CResponseMessage { Code = "-1", Message = "SEND_EMAIL_FAIL" };
                }
            });
        }

    }
}
