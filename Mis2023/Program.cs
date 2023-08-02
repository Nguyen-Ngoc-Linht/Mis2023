using BaseDataLib.Implementations;
using CommonLib.Implementations;
using CommonLib.Interfaces;
using DataServiceLib.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
//builder.Services.AddTransient<IUserDataContext, CUserContext>();
//builder.Services.AddTransient<IDataProvider, CDataProvider>();
//builder.Services.AddTransient<ISerilogProvider, CSerilog>();
//builder.Services.AddTransient<IErrorHandler, CErrorHandler>();

//builder.Services.AddTransient<ILogger, Logging>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=ReportCashFlow}/{action=Index}/{id?}");

app.Run();
