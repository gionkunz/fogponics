import {Component, NgModule, Inject} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SliderComponent} from './slider/slider';
import {HttpModule} from '@angular/http';
import {OutService} from './out-service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'fog-dashboard',
  template: `
    <fog-slider label="LED Brightness"
                [min]="0" [max]="1024" [step]="1" 
                [value]="initialLedValue | async" (valueChange)="onLedValueChange($event)"></fog-slider>
  `,
  providers: [
    OutService
  ]
})
export class DashboardComponent {
  initialLedValue: Observable<number>;

  constructor(@Inject(OutService) private outService: OutService) {
    this.initialLedValue = outService.getLedValue();
  }

  onLedValueChange(value) {
    this.outService.setLedValue(value).subscribe();
  }
}

@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [DashboardComponent, SliderComponent],
  bootstrap: [DashboardComponent]
})
export class DashboardModule {}
