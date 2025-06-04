import {
  Component,
  input,
  model,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Data, Mode } from '../../models/data.interface';


@Component({
  selector: 'app-base-event',
  templateUrl: '',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ButtonModule,
  ],

})
export class BaseEventFormComponent  {
 
  public mode= input.required<Mode>();

  public visible = model.required<boolean>();

  public data = model.required<Data[]>();

  public selectedElem=model.required<Data>();

  public formGroup: FormGroup;

  constructor(public fb: FormBuilder) {
    this.initForm();
  }

  public initForm():void {
    this.formGroup = this.fb.group({
      name: new FormControl(''),
      description: new FormControl(''),
      place: new FormControl(''),
    });
  }

  
  public submit():void {
    
    if (this.mode() === 'create') {
      this.data.update((v) => {
        v.push({
          id: Math.random(),
          title: this.formGroup.get('name').value,
          description: this.formGroup.get('description').value,
          location: this.formGroup.get('place').value,
          type: '',
        });
        return v;
      });

    } else {
      const elemIndex = this.data().findIndex(
        (v) => v.id === this.selectedElem().id
      );

      this.data()[elemIndex] = {
        id: this.selectedElem().id,
        title: this.formGroup.get('name').value,
        description: this.formGroup.get('description').value,
        location: this.formGroup.get('place').value,
        type: this.selectedElem().type,
      };
    }

    this.formGroup.reset()
    this.visible.set(false);
  }
}
