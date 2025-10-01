import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomFieldsPage } from './custom-fields.page';

describe('CustomFieldsPage', () => {
  let component: CustomFieldsPage;
  let fixture: ComponentFixture<CustomFieldsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFieldsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
