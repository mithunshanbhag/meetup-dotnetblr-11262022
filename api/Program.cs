using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Logging;

var builder = WebApplication.CreateBuilder(args);

#region Services

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// @DEMO: UNCOMMENT BELOW LINES DURING DEMO
// builder.Services
//     .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy => policy
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin()));

IdentityModelEventSource.ShowPII = true;

#endregion

var app = builder.Build();

#region Middleware // Note: COR pattern, order matters 

app.UseDeveloperExceptionPage();
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseCors();

// @DEMO: UNCOMMENT BELOW LINES TO DURING DEMO
// app.UseAuthentication(); // very important, else [Authorize] will not work.
// app.UseAuthorization();

app.MapControllers();

#endregion

app.Run();