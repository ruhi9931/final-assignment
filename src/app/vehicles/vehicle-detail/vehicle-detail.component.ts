import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle.model';
import { NgForm } from '@angular/forms';

import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent implements OnInit {

  //the below property will kepp track of the single vehicle.
  vehicle!: Vehicle;

  //the below property will keep track of the single vehicle'id.
  vehicleId!: number;

  //the below property will keep track of the vehicles from the vehicle array.
  vehicles!: Vehicle[];

  //the below property will keep track of the total amount of the booked vehicle based on the number of days.
  totalAmount: number = 0;

  //the below property will keep track of the start date of the booking.
  startDate: string = '';

  //the below property will keep track of the end date of the booking.
  endDate: string = '';
  // dateOfBirth: string = '';

  //the below property will make the dialog visible.
  dialog: boolean = false;

  //this will make the booking confirm dialog visible based on the value.
  bookingConfirmDialog: boolean = false;

  constructor(private route: ActivatedRoute, private vehicleService: VehicleService, private datastorageService: DataStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.vehicleId = +params['id'];
      this.datastorageService.retrieveVehicles().subscribe(
        (res) => {
          // this.vehicles = res.filter(vehicle => vehicle !== null);
          this.vehicles = Object.values(res);
          const foundVehicle = this.vehicles.find(v => v.id === this.vehicleId);
          if (foundVehicle) {
            this.vehicle = foundVehicle;
          } else {
            console.error('Vehicle not found');
          }
          //this.vehicle=this.vehicles[this.vehicleId];
        },
        (error)=>{
          console.log('Error occurred: ', error);
        }
      );
    });
  }

  //the below method will be called to calculate the total amount.
  calculateTotalAmount() {
    if (this.startDate && this.endDate) {
      const startDateObj: Date = new Date(this.startDate);
      const endDateObj: Date = new Date(this.endDate);
      const diffInMs: number = endDateObj.getTime() - startDateObj.getTime();
      const diffInDays: number = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
      this.totalAmount = diffInDays * this.vehicle.perDay;
      if (this.totalAmount < 0) {
        this.totalAmount = 0;
      }
    } else {
      this.totalAmount = 0;
    }
  }

  //the below method is used as custom validation to check whether the filled date is valid or not.
  isStartDateValid(): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedStartDate = new Date(this.startDate);
    return selectedStartDate >= today; // Check if start date is today or in the future
  }

  // Custom validation function for end date
  isEndDateValid(): boolean {
    const selectedStartDate = new Date(this.startDate);
    const selectedEndDate = new Date(this.endDate);
    return selectedEndDate >= selectedStartDate; // Check if end date is after or same as start date
  }

  //the below method is called when the user will submit the booking form.
  onSubmitBookingForm(f: NgForm) {

    console.log(f);
    this.vehicle.MakeItAvailable = false;
    // let vId = this.vehicle.id > -1 ? this.vehicle.id - 1 : 0;
    let vId = this.vehicle.id;
    this.datastorageService.updateVehicle(vId, this.vehicle).subscribe(() => {
      console.log('Vehicle availability updated successfully.');
    });
    this.dialog = true;
  }

  //the below method is called when the user will submit the user form.
  onSubmitUserForm(f2: NgForm) {
    this.datastorageService.addUser(f2.value);
    this.dialog = false;
    this.bookingConfirmDialog = true;
    f2.reset();
  }
}