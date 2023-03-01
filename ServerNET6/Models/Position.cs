namespace Exercise.Models;

public class Position
{
    [Key]
    public int idposition { get; set; }
    public string position_code { get; set; } = "";
    public string position_name { get; set; } = "";
    public int title_id { get; set; }
}