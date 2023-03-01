using Microsoft.AspNetCore.Mvc;

namespace Exercise.Controllers;

[Route("job/position")]
[ApiController]

public class JobPositionController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public JobPositionController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetPosition()
    {
        var dbJoin = (from p in _context.positions
                      join t in _context.titles on p.title_id equals t.idtitle
                      select new
                      {
                          p.idposition,
                          p.position_code,
                          p.position_name,
                          p.title_id,
                          t.title_code,
                          t.title_name
                      }).ToList();

        return Ok(dbJoin);
    }

    [HttpDelete("{idposition}")]
    public IActionResult DeletePosition(int idposition)
    {
        var dbFind = _context.positions.Find(idposition);
        if (dbFind == null)
            return BadRequest("Data not found");

        _context.positions.Remove(dbFind);
        _context.SaveChanges();
        return Ok();
    }

    [HttpPost]
    public IActionResult AddPosition(Position position)
    {
        _context.positions.Add(position);
        _context.SaveChanges();

        return Ok(_context.positions);
    }

    [HttpPatch("{idposition}")]
    public IActionResult EditPosition(Position position, int idposition)
    {
        var dbFind = _context.positions.Find(idposition);
        if (dbFind == null)
            return BadRequest("Data not found");

        dbFind.position_code = position.position_code;
        dbFind.position_name = position.position_name;
        dbFind.title_id = position.title_id;

        _context.SaveChanges();

        return Ok();
    }
}