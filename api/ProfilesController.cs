using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace api;

[ApiController]
[Route("[controller]")]
[Authorize]
[RequiredScope("Files.Read")]
public class ProfilesController : Controller
{
    [HttpGet("{id}")]
    public ActionResult Details(int id)
    {
        return Ok($"Passed: {User.Identity.Name}");
    }
}