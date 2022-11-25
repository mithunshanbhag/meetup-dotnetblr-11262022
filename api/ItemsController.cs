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
    [HttpGet]
    [HttpOptions]
    public ActionResult GetItems()
    {
        return Ok("Success: Returning 200/OK");
    }
}