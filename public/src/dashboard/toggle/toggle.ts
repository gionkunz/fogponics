import {Component, Input, Output, EventEmitter} from '@angular/core';
import template from './toggle.html';
import styles from './toggle.css';

@Component({
  selector: 'fog-toggle',
  template,
  styles: [styles]
})
export class ToggleComponent {
  @Input() label;
  @Input() checked;
  @Output() checkedChange = new EventEmitter();

  onInput(value) {
    this.checkedChange.next(!!value);
  }
}
