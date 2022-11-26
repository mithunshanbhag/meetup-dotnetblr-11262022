using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace api;

[ApiController]
[Route("[controller]")]
public class ItemsController : Controller
{
    [HttpGet("{id:int}")]
    [Authorize]
    [RequiredScope("Items.Read")]
    //[Authorize(Roles = "ItemReadersRole")]
    public ActionResult GetItem(int id)
    {
        return Ok($"Successfully fetched item #{id}");
    }
}