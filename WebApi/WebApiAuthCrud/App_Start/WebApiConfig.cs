using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApiAuthCrud
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            //config.EnableCors(new EnableCorsAttribute("http://localhost:4200", headers: "*", methods: "*"));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Filters.Add(new AuthorizeAttribute());

            //Set JSON formatter as default one and remove XmlFormatter
            //var jsonFormatter = config.Formatters.JsonFormatter;
            //jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            //config.Formatters.Remove(config.Formatters.XmlFormatter);
            //jsonFormatter.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc;
        }
    }
}
