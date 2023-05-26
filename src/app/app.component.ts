import { Component } from '@angular/core';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontendTFG';

  constructor(sessionService: SessionService) {
    let token = localStorage.getItem('token');
    sessionService.loadUser(token).then(
      (result) => {
        if (result) {
          console.log("User loaded");
        }
      }
    ).catch(
      (error) => {
        if (!error) {
          console.log("User not loaded");
        }
      }
    );
    
  }
}
