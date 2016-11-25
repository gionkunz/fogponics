import {Component, Input, Output, EventEmitter} from '@angular/core';
import template from './slider.html';
import styles from './slider.css';

@Component({
  selector: 'fog-slider',
  template,
  styles: [styles]
})
export class SliderComponent {
  @Input() min;
  @Input() max;
  @Input() step;
  @Input() value;
  @Input() label;
  @Output() valueChange = new EventEmitter();

  onInput(value) {
    this.valueChange.next(value);
  }
}
