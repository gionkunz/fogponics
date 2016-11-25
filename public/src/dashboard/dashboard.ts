import {Component, NgModule, Inject} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SliderComponent} from './slider/slider';
import {ToggleComponent} from './toggle/toggle';
import {HttpModule} from '@angular/http';
import {OutService} from './out-service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'fog-dashboard',
  template: `
    <fog-slider label="LED Brightness"
                [min]="0" [max]="1024" [step]="1" 
                [value]="initialLedValue | async" (valueChange)="onLedValueChange($event)"></fog-slider>
    <fog-toggle label="Fan On / Off"
                [checked]="initialFanValue | async" (checkedChange)="onFanValueChange($event)"></fog-toggle>
    <fog-toggle label="Fog On / Off"
                [checked]="initialFogValue | async" (checkedChange)="onFogValueChange($event)"></fog-toggle>
  `,
  providers: [
    OutService
  ]
})
export class DashboardComponent {
  initialLedValue: Observable<number>;
  initialFanValue: Observable<number>;

  constructor(@Inject(OutService) private outService: OutService) {
    this.initialLedValue = outService.getValue('led');
    this.initialFanValue = outService.getValue('fan');
    this.initialFogValue = outService.getValue('fog');
  }

  onLedValueChange(value) {
    this.outService.setValue('led', value).subscribe();
  }

  onFanValueChange(value) {
    this.outService.setValue('fan', value).subscribe();
  }

  onFogValueChange(value) {
    this.outService.setValue('fog', value).subscribe();
  }
}

@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [DashboardComponent, SliderComponent, ToggleComponent],
  bootstrap: [DashboardComponent]
})
export class DashboardModule {}
