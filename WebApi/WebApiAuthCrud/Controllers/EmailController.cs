using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using WebApiAuthCrud.Models;


namespace WebApiAuthCrud.Controllers
{
    public class EmailController : ApiController
    {

        [HttpPost]
        public async Task<IHttpActionResult> SendMail([FromBody] EmailModel email)
        {
            var client = new System.Net.Mail.SmtpClient("smtp.gmail.com", 111);
            client.UseDefaultCredentials = false;
            client.EnableSsl = true;

            client.Credentials = new System.Net.NetworkCredential("yourusername", "yourpassword");

            var mailMessage = new System.Net.Mail.MailMessage();
            mailMessage.From = new System.Net.Mail.MailAddress("sztojko.jozsef@google.com");

            mailMessage.To.Add(email.To);

            if (!string.IsNullOrEmpty(email.Cc))
            {
                mailMessage.CC.Add(email.Cc);
            }

            mailMessage.Body = email.Message;

            mailMessage.Subject = email.Subject;

            mailMessage.BodyEncoding = System.Text.Encoding.UTF8;
            mailMessage.SubjectEncoding = System.Text.Encoding.UTF8;

            await client.SendMailAsync(mailMessage);

            return Ok();
        }
    }

    //[HttpPost]
    //    [Route("send-email")]
    //    //public async Task SendEmail([FromBody] JObject objData)
    //    public async Task SendEmail(string itemsList)
    //    {
    //        var message = new MailMessage();
    //        //message.To.Add(new MailAddress(objData["toname"].ToString() + " <" + objData["toemail"].ToString() + ">"));
    //        message.From = new MailAddress("Auto Tina <sztojko.jozsef@email.com>");
    //        message.Bcc.Add(new MailAddress("Auto Tina <sztojko.jozsef@email.com>"));
    //        //message.Subject = objData["subject"].ToString();
    //        //message.Body = createEmailBody(objData["toname"].ToString(), objData["message"].ToString());
    //        message.IsBodyHtml = true;
    //        using (var smtp = new SmtpClient())
    //        {
    //            await smtp.SendMailAsync(message);
    //            await Task.FromResult(0);
    //        }
    //    }

    //    private string createEmailBody(string userName, string message)
    //    {
    //        string body = string.Empty;
    //        using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("/htmlTemplate.html")))
    //        {
    //            body = reader.ReadToEnd();
    //        }
    //        body = body.Replace("{UserName}", userName);
    //        body = body.Replace("{message}", message);
    //        return body;
    //    }
    }


