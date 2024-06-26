import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { VehicleService } from "../vehicles/vehicle.service";
import { User } from "../vehicles/user/user.model";
import { Vehicle } from "../vehicles/vehicle.model";

@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(private http:HttpClient, private vehicleService:VehicleService){}

    //it'll be called to store the single vehicle in the vehicle array of the database.
    storedVehicles(vehicle:Vehicle){
        // const vehicles = this.vehicleService.getVehicles();
        this.http.put<Vehicle>(
           `https://angular-assessment-333e5-default-rtdb.firebaseio.com/vehicles/${vehicle.id}.json`,
            vehicle
        ).subscribe(
            (response)=>{console.log(response);
            }
        );
    }

    //it'll be called to retrieve the data from the database.
    retrieveVehicles(){
        return this.http.get<Vehicle[]>(
            'https://angular-assessment-333e5-default-rtdb.firebaseio.com/vehicles.json')
    }

    //it'll be called to store the user data in the database.
    addUser(userData:User){   
        this.http.put<User>('https://angular-assessment-333e5-default-rtdb.firebaseio.com/userData.json',
            userData
        ).subscribe((response)=>{
            console.log(response);    
        })
    }

    //it'll be called to retrieve the user data from the database.
    retrieveUserDetail(){
        return this.http.get<User>('https://angular-assessment-333e5-default-rtdb.firebaseio.com/userData.json')    
    }

    //it'll be called to update the vehicle details in the database.
    updateVehicle(vId:number, vehicle: Vehicle) {
        return this.http.patch<Vehicle>(
          `https://angular-assessment-333e5-default-rtdb.firebaseio.com/vehicles/${vId}.json`,
          vehicle
        );
    }

    //it'll be called to delete the vehicle from the vehicle array of the database.
    deleteVehicle(vId:number){
        return this.http.delete<Vehicle>(
            `https://angular-assessment-333e5-default-rtdb.firebaseio.com/vehicles/${vId}.json`);
    }
}