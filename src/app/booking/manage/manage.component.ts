import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Data } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { Table } from 'primeng/table';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Vehicle } from 'src/app/vehicles/vehicle.model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {

  //it'll keep the id of the selected vehicle.
  vId!: number;

  //it's used to keep the track of the single vehicle.
  vehicle!: Vehicle;

  //it's used for p-table to check whether it's in loading state or it's loaded.
  loading: boolean = true;

  //it'll keep track of the vehicles from the vehicle array.
  vehicles: Vehicle[] = [];

  //it'll used to make visible dialog.
  displayDialog: boolean = false;

  //it'll be used to make visible the edit form dialog.
  displayDialogForEdit: boolean = false;

  //it's used for the dialog reference.
  @ViewChild('dialogRef') dialogRef!: Dialog;

  //it's used for the edit dialog reference.
  @ViewChild('dialogRefEdit') dialogRefEdit!: Dialog;

  //it's used for the table reference.
  @ViewChild('dt1') dt1!: Table;

  gotoPage!: number;

  totalPages!: number;

  constructor(private datastorageService: DataStorageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.loading = true;
    this.datastorageService.retrieveVehicles().subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.vehicles = Object.values(res);
          let row = this.dt1 && this.dt1.rows ? this.dt1.rows : 5;
          this.totalPages = Math.ceil(this.vehicles.length / row);
          console.log(this.totalPages);
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error loading vehicles:', error);
        this.loading = false;
      }
    );
  }

  //it'll filter the data based on the input in the search.
  onInput(event: any) {
    if (event.target) {
      this.dt1.filter(event.target.value, 'Name', 'contains');
    }
  }

  //it'll be called after clicking on the button.
  onClick() {
    this.displayDialog = true;
  }

  //it'll be called when user submit the vehicle form.
  save(vehicleForm: NgForm) {
    if (vehicleForm.valid) {
      const vehicleData = vehicleForm.value;
      const timestamp = Date.now();
      const newVehicle: Vehicle = {
        id: timestamp,
        imagePath: vehicleData.imagePath,
        Name: vehicleData.Name,
        Category: vehicleData.Category,
        PlateNumber: vehicleData.PlateNumber,
        perDay: vehicleData.perDay,
        Details: vehicleData.Details,
        MakeItAvailable: true
      };
      this.vehicles.push(newVehicle);
      this.datastorageService.storedVehicles(newVehicle);
      console.log("Vehicle added:", newVehicle);
    }

    vehicleForm.reset();
    this.hideDialog();
  }

  //it'll be called after clicking on the cancle button.
  hideDialog() {
    this.displayDialog = false;
  }

  //it'll be called clicking on the checkbox to make the vehicle available.
  onClickCheckbox(id: number) {
    const clickedVehicle = this.vehicles.find(vehicle => vehicle.id === id);

    if (clickedVehicle) {
      clickedVehicle.MakeItAvailable = true;

      this.datastorageService.updateVehicle(id, clickedVehicle).subscribe(
        (response) => {
          console.log('Vehicle updated successfully:', response);
        },
        (error) => {
          console.error('Error updating vehicle:', error);
        }
      );
    } else {
      console.error(`Vehicle with id ${id} not found.`);
    }
  }

  //it'll be called when we'll click on the edit button.
  onClickEdit(vehicle: Vehicle) {
    // this.vId = vehicle.id;
    this.vehicle = { ...vehicle }
    this.displayDialogForEdit = true;
  }

  //it'll be called when we'll click on the submit button of the edit dialog.
  onClickEditForSubmit(form: NgForm) {
    this.datastorageService.updateVehicle(this.vehicle.id, this.vehicle).subscribe(
      (updateVehicle) => {
        const index = this.vehicles.findIndex(v => v.id === updateVehicle.id);
        if (index !== -1) {
          this.vehicles[index] = { ...updateVehicle };
        }
      },
      (error) => {
        console.log('Error!', error);
      }
    );
    const event = new Event('dummy');
    this.dialogRefEdit.close(event);

  }

  //it'll be called when we'll click on the cancle button.
  onClickCancle() {
    // const event = new Event('dummy');
    // this.dialogRefEdit.close(event);
    this.displayDialogForEdit = false;
  }

  onClickDelete() {

  }

  //it'll be called when the delete dialog will be appeared.
  confirmDelete(vehicle: Vehicle) {
    this.confirmationService.confirm({
      message:
      `<div class="confirmation-dialog">
        <div class="confirmation-body">
          <img src="${vehicle.imagePath}" alt="${vehicle.Name}" class="custom-image">
        </div>
        <div class="confirmation-content">
          <div class="confirmation-par">
            <span class="confirmation-icon">
              <i class="pi pi-exclamation-triangle"></i>
            </span>
            <p>Do you want to delete ${vehicle.Name} from the list?</p>
          </div>
        </div>
      </div>
  `,
      // header: 'Delete Vehicle',
      // icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.datastorageService.deleteVehicle(vehicle.id).subscribe(
          () => {
            this.vehicles = this.vehicles.filter(v => v.id !== vehicle.id);
          },
          (error) => {
            console.error('Error deleting vehicle:', error);
          }
        );
      },
      reject: () => {

      },
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'custom-yes-button',
      rejectButtonStyleClass: 'custom-no-button'
    });
  }

  onPageChange(event: any) {
    console.log('Page changed:', event);
    
  }

  onGoButtonClick(){
    console.log('Go button clicked.');
    console.log(this.gotoPage);

    if (this.gotoPage > 0 && this.gotoPage <= this.totalPages && this.dt1) {
      this.dt1.first = (this.gotoPage - 1) * 5;
     // this.dt1.reset();
    }
  }
}