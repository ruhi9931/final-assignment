import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../vehicle.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

export interface Category{
  image:string;
  description: string;
  type:string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categories: Category[]=[];
  isExpanded: boolean = false;
  responsiveOptions!: any[];

  constructor(private router:Router, private route:ActivatedRoute,private datastorageService:DataStorageService){}

  ngOnInit(){

    this.categories = [
      {
        image:'assets/images/p11.png',
        description:'Discover the Freedom of Car Rentals with Rent Wheels',
        type: 'Cars'
      },
      {
        image:'assets/images/p4.png',
        description:'Enjoy the Freedom of Bike Rentals with Rent Wheels',
        type: 'Bikes'
      },
      {
        image:'assets/images/p7.png',
        description:'Explore the Freedom of Van Rentals with Rent Wheels',
        type: 'Vans'
      }
    ]

    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  //it'll be called whenever user will click on the read more or read less.
  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  //it'll be called whenever user will click on the any one of category.
  onClick(){
    console.log('route method ');
    this.router.navigate(['vehicle-list'],{relativeTo:this.route});
  }
  // onClickButton(){
  //   this.datastorageService.storedVehicles();
  // }
}
