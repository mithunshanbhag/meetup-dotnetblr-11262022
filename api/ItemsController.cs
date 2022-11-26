using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;

namespace api;

[ApiController]
[Route("[controller]")]
public class ItemsController : Controller
{
    [HttpGet("{id:int}")]
    // @DEMO: UNCOMMENT BELOW LINES DURING DEMO
    // [Authorize]
    // [RequiredScope("Items.Read")]
    public ActionResult GetItem(int id)
    {
        var userName = User.HasClaim(claim => claim.Type == "name")
            ? User.Claims.Single(claim => claim.Type == "name").Value
            : "Anonymous";

        return Ok($"Successfully fetched item #{id} for user: {userName}");
    }
}