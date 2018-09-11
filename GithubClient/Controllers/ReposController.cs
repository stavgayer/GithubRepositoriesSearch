using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GithubClient.models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace GithubClient.Controllers
{
    public class ReposController : Controller
    {
        // GET: Repos from session state
        public IActionResult Index()
        {
            List<JObject> jsonList = new List<JObject>();
            foreach(string s in HttpContext.Session.Keys)
            {
                var json = JObject.Parse(HttpContext.Session.GetString(s));
                jsonList.Add(json);
            }
            //var list = HttpContext.Session;
            return Json(jsonList);
        }

        
        // POST: Repos/AddRepo || add repos to session state  
        public JsonResult AddRepo([FromBody]JObject collection)
        {
            
            var id = collection.Value<string>("id");
            HttpContext.Session.SetString(id, JsonConvert.SerializeObject(collection));
            return Json(HttpContext.Session.Keys);

        }
    }
}