import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
import { Data } from './table-basic-demo';

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
  providers: [],
})
export class BaseEventFormComponent implements OnInit {
  @Input()
  public mode: string;

  public visible = model<boolean>(false);

  public data = model<Data[]>();

  @Input()
  public selectedElems: any;

  public group1: FormGroup;
  constructor(public fb: FormBuilder) {
    this.initForm();
  }

  public initForm() {
    this.group1 = this.fb.group({
      name: new FormControl(''),
      description: new FormControl(''),
      place: new FormControl(''),
    });
  }

  @Output()
  public group = new EventEmitter<FormGroup>();

  ngOnInit() {}

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
