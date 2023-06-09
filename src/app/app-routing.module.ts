import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { MenuComponent } from './components/menu/menu.component';
import { OrderComponent } from './components/order/order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignedOutGuard } from './guards/signed-out.guard';
import { SignedInGuard } from './guards/signed-in.guard';
import { WaiterGuard } from './guards/waiter.guard';
import { ItemComponent } from './components/item/item.component';

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent, data: { title: 'Menu' } },
  { path: 'item/:id', component: ItemComponent, data: { title: 'Product' }},
  { path: 'orders/:id', component: OrderComponent, data: { title: 'Order' }, canActivate: [SignedInGuard, WaiterGuard] },
  { path: 'create/orders', component: CreateOrderComponent, data: { title: 'Create Order' }, canActivate: [SignedInGuard] },
  { path: 'orders', component: OrdersComponent, data: { title: 'Orders' }, canActivate: [SignedInGuard] },
  { path: 'signin', component: SignInComponent, data: { title: 'Login' }, canActivate: [SignedOutGuard] },
  { path: 'signup', component: SignUpComponent, data: { title: 'Register' }, canActivate: [SignedInGuard] },
  { path: '**', redirectTo: '/menu', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
