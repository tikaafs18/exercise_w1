namespace Exercise.Models;

public class Title
{
    [Key]
    public int idtitle { get; set; }
    public string title_code { get; set; } = "";
    public string title_name { get; set; } = "";
    public bool isDeleted { get; set; }
}