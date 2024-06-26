import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User | undefined;

  constructor(private datastorageService: DataStorageService) {}

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
  }
}
