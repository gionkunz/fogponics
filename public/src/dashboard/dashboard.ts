import {Component, NgModule, Inject} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SliderComponent} from './slider/slider';
import {HttpModule} from '@angular/http';
import {OutService} from './out-service';

@Component({
  selector: 'fog-dashboard',
  template: `
    <fog-slider [min]="0" [max]="1024" [step]="1" 
                [value]="0" (valueChange)="onLedValueChange($event)"></fog-slider>
  `,
  providers: [
    OutService
  ]
})
export class DashboardComponent {
  constructor(@Inject(OutService) private outService: OutService) {

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
