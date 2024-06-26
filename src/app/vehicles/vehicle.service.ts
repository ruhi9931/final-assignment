import { Injectable } from "@angular/core";
import { Vehicle } from "./vehicle.model";

@Injectable()
export class VehicleService{
    
    private vehicles: Vehicle[] = [
        // new Vehicle(
        //     Date.now(), 
        //     'assets/images/p8.png',
        //     'BMW F6', 
        //     150, 
        //     'Cars', 
        //     'KA 1234',
        //     'N/A',
        //     true
        // ),
    // new Vehicle(
    //          1,
    //         'assets/images/p10.png',
    //             'Audi F6',
    //             100,
    //             'Cars',
    //             'MA 1234',
    //             'N/A',
    //             true
    //             ),
    //             new Vehicle(
    //                 2,
    //                 'assets/images/p8.png',
    //                     'Mercedese',
    //                     400,
    //                     'Cars',
    //                     'UA 3234',
    //                     'N/A',
    //                     true
    //                     ),
                        
    //                     new Vehicle(
    //                     3,
    //                     'assets/images/p10.png',   
    //                     'BMW F6',
    //                     350,
    //                     'Cars',
    //                     'BA 9234',
    //                     'N/A',
    //                     true
    //                      ),
    //                     new Vehicle(
    //                     4,
    //                     'assets/images/p8.png', 
    //                     'BMW F6',
    //                     150,
    //                     'Cars',
    //                     'KA 1234',
    //                     'N/A',
    //                     true
    //                     ),
    //                     new Vehicle(
    //                     5,
    //                     'assets/images/p10.png',
    //                     'BMW F6',
    //                     150,
    //                     'Cars',
    //                     'KA 1234',
    //                     'N/A',
    //                     true
    //                     ),
];
    // getVehicles(){
    //     return this.vehicles.slice();
    // }

    // getVehicle(index:number){
    //     return this.vehicles[index];
    // }

    // setVehicles(vehicles: Vehicle[]) {
    //     this.vehicles = vehicles;
    // }

    // addVehicle(vehicle: Vehicle) {
    //     this.vehicles.push(vehicle);
    // }

    // updateVehicle(index: number, newVehicle: Vehicle) {
    //     this.vehicles[index] = newVehicle;
    // }
    
    // deleteVehicle(index: number) {
    //     this.vehicles.splice(index, 1);
    // }
}