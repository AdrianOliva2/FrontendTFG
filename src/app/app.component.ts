import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessionService } from './services/session.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
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
