import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderComponent } from './components/order/order.component';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignOutModalComponent } from './components/sign-out-modal/sign-out-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MenuComponent,
    OrderComponent,
    CreateOrderComponent,
    OrdersComponent,
    OrdersListComponent,
    SignInComponent,
    SignUpComponent,
    SignOutModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
