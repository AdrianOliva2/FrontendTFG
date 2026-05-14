// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Load all spec files explicitly (avoid require.context issues)
import './app/app.component.spec';
import './app/services/session.service.spec';
import './app/services/orders.service.spec';
import './app/services/items.service.spec';
import './app/guards/waiter.guard.spec';
import './app/guards/signed-out.guard.spec';
import './app/guards/signed-in.guard.spec';
import './app/guards/chef.guard.spec';
import './app/guards/admin.guard.spec';
import './app/components/token-invalid-modal/token-invalid-modal.component.spec';
import './app/components/sign-in/sign-in.component.spec';
import './app/components/nav-bar/nav-bar.component.spec';
import './app/components/sign-up/sign-up.component.spec';
import './app/components/create-order/create-order.component.spec';
import './app/classes/user.spec';
import './app/classes/order.spec';
import './app/classes/item.spec';
import './app/components/orders/orders.component.spec';
import './app/components/item/item.component.spec';
import './app/components/sign-out-modal/sign-out-modal.component.spec';
import './app/components/menu/menu.component.spec';
import './app/components/order/order.component.spec';

