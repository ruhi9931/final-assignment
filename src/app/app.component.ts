import { Component } from '@angular/core';
import { AuthService } from './Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'final-assignment';

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.autoLogin();
  }
}