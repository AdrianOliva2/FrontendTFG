import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule, HttpClientModule, NgbModule)
  ]
}).catch(err => console.error(err));
