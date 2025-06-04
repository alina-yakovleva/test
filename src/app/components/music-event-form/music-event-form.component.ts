import { Component, output, model, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { BaseEventFormComponent } from '../base-event-form/base-event-form.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Col } from '../../models/data.interface';


@Component({
  selector: 'app-music-event-form',
  templateUrl: 'music-event-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BaseEventFormComponent,
    InputTextModule,
    ButtonModule,
  ],
})
export class MusicEventFromComponent extends BaseEventFormComponent implements OnInit {

  public group=output<FormGroup>()


  constructor(public fb: FormBuilder) {
    super(fb);
  }

  ngOnInit(): void {
    console.log(this.mode())
    this.group.emit(this.formGroup)
  }

  public override initForm():void {
    super.initForm();
    this.formGroup?.addControl('musicGenre', this.fb.control(''));
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
          musicGenre: this.formGroup.get('musicGenre').value
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
          musicGenre: this.formGroup.get('musicGenre').value
        };
  
      }
      
    }
  this.selectedElem.set(null)
    this.formGroup.reset()

    this.visible.set(false);
  }
}