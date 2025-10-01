import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-picker-select',
  templateUrl: './picker-select.component.html',
  styleUrls: ['./picker-select.component.scss'],
  standalone: false
})
export class PickerSelectComponent implements OnInit, OnChanges {
  @Input() label: string = '';
  @Input() control!: FormControl;
  @Input() options: { value: string, text: string }[] = [];

  selectedText: string = '';
  currentValue: string = '';

  ngOnInit() {
    this.syncSelected();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['control'] || changes['options']) {
      this.syncSelected();
    }
  }

  private syncSelected() {
    const value = this.control?.value;
    if (value) {
      const match = this.options.find(opt => opt.value === value);
      this.selectedText = match?.text || '';
      this.currentValue = value;
    }
  }

  onIonChange(event: CustomEvent) {
    this.currentValue = event.detail.value;
  }

  onDidDismiss(event: CustomEvent) {
    const value = event.detail.data;
    if (value) {
      this.control.setValue(value);
      const match = this.options.find(opt => opt.value === value);
      this.selectedText = match?.text || '';
    }
  }
}
