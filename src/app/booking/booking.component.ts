import { Component, ViewChild } from '@angular/core';
import { VehicleService } from '../vehicles/vehicle.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Vehicle } from '../vehicles/vehicle.model';
import { NgForm } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { User } from '../vehicles/user/user.model';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {

  //it'll keep the vehicle id track.
  vId!: number;

  //it'll keep the track of the single vehicle.
  vehicle!: Vehicle;

  //it'll keep the track of the vehicle, if the vehicle with the given id is found.
  foundVehicle!: Vehicle[];

  //it'll keep the track of the vehicle id.
  vid!: number;

  //it's used to keep the reference of the dialog to make it visible or hide.
  @ViewChild('dialogRef') dialogRef!: Dialog;

  //it'll keep the track of all the vehicles of Vehicle array.
  vehicles!: Vehicle[];

  //it's used to make the dialog visible or hide.
  dialog: boolean = false;

  //it's property used to keep the name of the selected vehicle.
  selectedVehicleName: string = '';

  //it's property used to keep the category of the selected vehicle.
  selectedVehicleCategory: string = '';

  bookingConfirmDialog:boolean = false;

  constructor(private vehicleService: VehicleService, private datastorageService: DataStorageService) { }

  ngOnInit() {
    this.datastorageService.retrieveVehicles().subscribe(
      (res) => {
        if (res) {
          this.vehicles = Object.values(res);
        }
      },
      (error)=>{console.log('Error occured: ',error);
      }
    );
  }


  //it'll be called whenever we'll click on the button.
  onClick(id: number) {
    this.dialog = true;
    const foundVehicle: any = this.vehicles.find(v => v.id === id);
    this.selectedVehicleName = foundVehicle.Name;
    this.selectedVehicleCategory = foundVehicle.Category;
    if (foundVehicle) {
      this.vehicle = foundVehicle;
    } else {
      console.error('Vehicle not found!');
    }
    this.vId = this.vehicle.id;
  }

  //it'll be called whenever we'll submit the booking form.
  onSubmitBookingForm(bookingForm: NgForm) {
    // console.log(bookingForm);
    // console.log(bookingForm);
    const event = new Event('dummy');
    this.dialogRef.close(event);

    if (this.vehicle) {
      this.vehicle.MakeItAvailable = false;
      this.datastorageService.updateVehicle(this.vId, this.vehicle).subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.error('Error updating vehicle:', error);
        }
      );
    } else {
      console.error('Vehicle not found!');
    }

    const user: User = {
      name: bookingForm.value.name,
      address: bookingForm.value.address,
      email: bookingForm.value.email,
      phone: bookingForm.value.phone,
      dob: bookingForm.value.dob,
      dl: bookingForm.value.dl
    }

    this.datastorageService.addUser(user);
    // console.log(user);

    this.datastorageService.updateVehicle(this.vId, this.vehicle).subscribe(
      (res) => {
        console.log(res);
      }
    )

    this.bookingConfirmDialog=true;

    bookingForm.reset();
  }

  onClickCancle(){
    this.dialog=false;
  }
}
