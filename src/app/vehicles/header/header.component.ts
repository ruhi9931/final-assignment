import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user/user.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  //the below property has been used to display the dialog to get the user details.
  displayUserDialog:boolean=false;

  //this property will ensure that the format of the user will be from the User model.
  user!: User;

  //it'll check who logged in Admin or user.
  isAdmin:boolean=false;
  
  constructor(private router:Router, private route:ActivatedRoute,private datastorageService:DataStorageService,private authService:AuthService){}

  ngOnInit() {
    this.datastorageService.retrieveUserDetail().subscribe(
      (res: User) => {
        this.user = res;
        console.log(this.user);
      },
      (error)=>{
        console.log('Error occured: ', error);
      }
    );

    const isAdminString = localStorage.getItem('isAdmin');
    if (isAdminString!== null) {
      this.isAdmin = JSON.parse(isAdminString);
    } else {
      this.isAdmin = false;
    }
  }
  
  //it'll be called whenever user will click on the button.
  onClick(){
    // this.router.navigate(['user-detail']);
    this.displayUserDialog=true;
  }

  //it'll be called whenever user will click on the booking button.
  onClickBooking(){
    this.router.navigate(['booking']);
  }

  //it'll be called whenever user will click on the logout button.
  onClickLogout(){
    this.authService.logout();
  }

  //it'll be called whenever user will click on the manage button.
  onClickManage(){
    this.router.navigate(['/manage']);
  }

}