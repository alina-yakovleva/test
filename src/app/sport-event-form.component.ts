import { Component, EventEmitter, Input, Output, model } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { BaseEventFormComponent } from './base-event-form.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Col, Data } from './table-basic-demo';

@Component({
  selector: 'app-sport-event',
  templateUrl: 'sport-event-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BaseEventFormComponent,
    InputTextModule,
    ButtonModule,
  ],
})
export class SportEventFormComponent extends BaseEventFormComponent {
  @Output()
  public group = new EventEmitter<FormGroup>();

  public cols = model<Col[]>();

  ngOnInit() {}

  constructor(public fb: FormBuilder) {
    super(fb);
  }

  public override initForm() {
    super.initForm();
    this.group1?.addControl('participantsCount', this.fb.control(''));
  }

  public submit() {
    console.log(this.group1);
    if (this.mode === 'create') {
      this.data.update((v) => {
        v.push({
          id: Math.random(),
          title: this.group1.get('name').value,
          description: this.group1.get('description').value,
          location: this.group1.get('place').value,
          type: '',
        });
        return v;
      });
    } else {
      const elemIndex = this.data().findIndex(
        (v) => v.id === this.selectedElems.id
      );

      this.data()[elemIndex] = {
        id: this.selectedElems.id,
        title: this.group1.get('name').value,
        description: this.group1.get('description').value,
        location: this.group1.get('place').value,
        type: this.selectedElems.type,
      };
    }
    this.visible.set(false);
  }
}
