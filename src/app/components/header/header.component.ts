import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent implements OnInit {

  @Input() pageTitle: string = "";

  @Input() showAction: boolean = false;
  @Input() actionIcon: string = 'add-circle-outline';
  @Output() action = new EventEmitter<void>();

  @Input() showSecondaryAction: boolean = false;
  @Input() secondaryIcon: string = 'funnel-outline';
  @Output() secondaryAction = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  emitAction() {
    this.action.emit();
  }
}
