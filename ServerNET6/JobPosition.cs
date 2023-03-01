namespace Exercise;

public class JobPosition : JobTitle
{
    public int IdPosition { get; set; }
    public string PositionCode { get; set; } = "";
    public string PositionName { get; set; } = "";
    public int Title_Id { get; set; }
}