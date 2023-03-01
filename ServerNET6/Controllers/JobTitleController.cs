using Microsoft.AspNetCore.Mvc;

namespace Exercise.Controllers;

[Route("job/title")]
[ApiController]

public class JobTitleController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public JobTitleController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetJobTitle()
    {
        return Ok(_context.titles);
    }

    [HttpDelete("{idtitle}")]
    public IActionResult DeleteJobTitle(int idtitle)
    {
        var dbTitle = _context.titles.Find(idtitle);
        if (dbTitle == null)
            return BadRequest("Data not found");

        dbTitle.isDeleted = true;
        _context.SaveChanges();

        return Ok();
    }

    [HttpPost]
    public IActionResult CreateJobTitle(Title title)
    {
        _context.titles.Add(title);
        _context.SaveChanges();

        return Ok(_context.titles);
    }

    [HttpPatch("{idtitle}")]
    public IActionResult EditJobTitle(Title title, int idtitle)
    {
        var dbFindTitle = _context.titles.Find(idtitle);
        if (dbFindTitle == null)
            return BadRequest("Data not found");

        dbFindTitle.title_code = title.title_code;
        dbFindTitle.title_name = title.title_name;
        dbFindTitle.isDeleted = title.isDeleted;

        _context.SaveChanges();

        return Ok(_context.titles);
    }
}
