import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {DashboardModule} from './dashboard/dashboard';

const platform = platformBrowserDynamic();
platform.bootstrapModule(DashboardModule);
