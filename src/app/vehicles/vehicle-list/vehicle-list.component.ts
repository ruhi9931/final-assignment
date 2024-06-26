import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle.model';
import { VehicleService } from '../vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  
  //the below vehicle property will keep track of the vehicles from the vehicle array.
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehicleService, private router: Router, private route: ActivatedRoute, private datastorageService: DataStorageService) { }

  ngOnInit() {
    this.datastorageService.retrieveVehicles().subscribe(
      (res) => {
       // this.vehicles = res.filter(vehicle => vehicle !== null);
         this.vehicles =Object.values(res);
      },
      (error)=>{
        console.log('Error occurred: ', error);
      }
    );
  }

  //below method will be called whenever we'll click on any vehicle from the vehicle list.
  onClick(index: number) {
    this.router.navigate([index], { relativeTo: this.route });
  }
}