namespace Exercise.Models;

public class Employee
{
    [Key]
    public int idemployee { get; set; }
    public string employee_name { get; set; } = "";
    public string nik { get; set; } = "";
    public string employee_address { get; set; } = "";
    public int position_id { get; set; }
}