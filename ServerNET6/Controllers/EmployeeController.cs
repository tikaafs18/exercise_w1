using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace Exercise.Controllers;

[Route("employee/info")]
[ApiController]

public class EmployeeController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public EmployeeController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetEmployee()
    {
        var dbJoin = (from e in _context.employees
                      join p in _context.positions on e.position_id equals p.idposition
                      join t in _context.titles on p.title_id equals t.idtitle
                      select new
                      {
                          e.idemployee,
                          e.employee_name,
                          e.nik,
                          e.employee_address,
                          e.position_id,
                          p.position_code,
                          p.position_name,
                          p.title_id,
                          t.title_code,
                          t.title_name
                      }).ToList();

        return Ok(dbJoin);
    }

    [HttpDelete("{idemployee}")]
    public IActionResult DeleteEmployee(int idemployee)
    {
        var dbFind = _context.employees.Find(idemployee);
        if (dbFind == null)
            return BadRequest("Data not found");

        _context.employees.Remove(dbFind);
        _context.SaveChanges();

        return Ok();
    }

    [HttpPost]
    public IActionResult AddEmployee(Employee employee)
    {
        _context.employees.Add(employee);
        _context.SaveChanges();

        return Ok();
    }

    [HttpPatch("{idemployee}")]
    public IActionResult EditEmployee(Employee employee, int idemployee)
    {
        var dbFind = _context.employees.Find(idemployee);
        if (dbFind == null)
            return BadRequest("Data not found");

        dbFind.employee_name = employee.employee_name;
        dbFind.nik = employee.nik;
        dbFind.employee_address = employee.employee_address;
        dbFind.position_id = employee.position_id;

        _context.SaveChanges();

        return Ok();
    }
}