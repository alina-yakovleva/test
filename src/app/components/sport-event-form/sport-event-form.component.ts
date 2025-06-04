import { Component, output, model, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { BaseEventFormComponent } from '../base-event-form/base-event-form.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Col } from '../../models/data.interface';


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
export class SportEventFormComponent extends BaseEventFormComponent implements OnInit {

  public cols = model<Col[]>();

  public group=output<FormGroup>()


  constructor(public fb: FormBuilder) {
    super(fb);
  }

  ngOnInit(): void {
    this.group.emit(this.formGroup)
  }

  public override initForm():void {
    super.initForm();
    this.formGroup?.addControl('participantsCount', this.fb.control(''));
  }

  public override submit():void {
    if (this.mode() === 'create') {
      this.data.update((v) => {
        v.push({
          id: Math.random(),
          title: this.formGroup.get('name').value,
          description: this.formGroup.get('description').value,
          location: this.formGroup.get('place').value,
          type: '',
          participantsCount: this.formGroup.get('participantsCount').value
        });
        return v;
      });
    } else {
      const elemIndex = this.data().findIndex(
        (v) => v.id === this.selectedElem().id
      );

      if(elemIndex>=0){
      
        this.data()[elemIndex] = {
          id: this.selectedElem().id,
          title: this.formGroup.get('name').value,
          description: this.formGroup.get('description').value,
          location: this.formGroup.get('place').value,
          type: this.selectedElem().type,
          participantsCount: this.formGroup.get('participantsCount').value
        };
  
      }
      
    }
  this.selectedElem.set(null)
    this.formGroup.reset()

    this.visible.set(false);
  }
}
