using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Logging;

var builder = WebApplication.CreateBuilder(args);

#region Services

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));
//.AddJwtBearer(options =>
//{
//    options.Authority = "https://login.microsoftonline.com/common/v2.0";
//    options.Audience = "api://9db8d08a-d9b6-4e4c-8b46-a3898f985735";
//});

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));

IdentityModelEventSource.ShowPII = true;

#endregion

var app = builder.Build();

#region Middleware // Note: COR pattern, order matters 

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication(); // very important, else [Authorize] will not work.
app.UseAuthorization();
app.MapControllers();

#endregion

app.Run();