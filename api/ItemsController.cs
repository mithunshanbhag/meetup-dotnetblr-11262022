using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api;

[ApiController]
[Route("[controller]")]
[Authorize]
//[Authorize(Roles = "Tailwind.Contributor")]
//[RequiredScope("Files.Read")]
public class ItemsController : Controller
{
    [HttpGet("{id:int}")]
    public ActionResult GetItem(int id)
    {
        return Ok($"Successfully fetched item #{id}");
    }

    [HttpPost("{id:int}")]
    public ActionResult UpdateItem(int id)
    {
        return Ok($"Successfully updated item #{id}");
    }

}