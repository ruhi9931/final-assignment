export class Vehicle{
    public id:number;
    public imagePath: string;
    public Name: string;
    public Category: string;
    public PlateNumber: string;
    public perDay: number;
    public Details: string;
    public MakeItAvailable: boolean;

    constructor(id:number,imagePath: string, Name: string, perDay:number,Category: string, PlateNumber: string, Details: string, MakeItAvailable: boolean) {
        this.id=id;
        this.imagePath = imagePath;
        this.Name = Name;
        this.Category = Category;
        this.PlateNumber = PlateNumber;
        this.perDay = perDay;
        this.Details = Details;
        this.MakeItAvailable = MakeItAvailable; 
    }
}