namespace Exercise;

public class JobEmployee : JobPosition
{
    public int IdEmployee { get; set; }
    public string EmployeeName { get; set; } = "";
    public string Nik { get; set; } = "";
    public string EmployeeAddress { get; set; } = "";
    public int Position_Id { get; set; }
}