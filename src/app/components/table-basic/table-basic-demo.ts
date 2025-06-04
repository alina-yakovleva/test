import { Component, signal } from '@angular/core';
import { ImportsModule } from '../../imports';
import { ProductService } from '@/service/productservice';
import {  FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { Col, Data, Mode } from '../../models/data.interface';
import { cols, data } from '../../mocks/data.mock';
import { SportEventFormComponent } from '../sport-event-form/sport-event-form.component';
import { MusicEventFromComponent } from '../music-event-form/music-event-form.component';



@Component({
  selector: 'table-basic-demo',
  templateUrl: 'table-basic-demo.html',
  standalone: true,
  imports: [
    ImportsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SportEventFormComponent,
    MusicEventFromComponent
  ],
  providers: [ProductService, ConfirmationService],
})
export class TableBasicDemo  {

  constructor(
    public confirmationService: ConfirmationService,

  ) {}
  public cols = signal<Col[]>(cols);

  public data = signal<Data[]>(data);


  public visible=signal<boolean>(false);

  public mode=signal<Mode>('create');

  public selectedElem=signal<Data|null>(null);

  
  public formGroup: FormGroup;


  public create():void {
    this.visible.set(true);
    this.mode.set('create');
  }

  public getGroup(formGroup:FormGroup):void{
    this.formGroup=formGroup
  }

 
  public edit():void {
    this.visible.set(true);
    this.mode.set('edit');

    this.formGroup.patchValue({
      name: this.selectedElem().title,
      participantsCount: this.selectedElem().participantsCount,
      description:this.selectedElem().description,
      type:this.selectedElem().type,
      place:this.selectedElem().location,
      musicGenre:this.selectedElem().musicGenre
    })
    
  }

  public openDeleteDialog():void {
    this.confirmationService.confirm({
      header: 'Вы уверены, что хотите удалить запись?',
      acceptLabel: 'Удалить',
      rejectLabel: 'Отменить',
      accept: () => {
        this.data.update((v) => {
          return v.filter((v) => v.id !== this.selectedElem().id);
        });
        this.selectedElem.set(null)
      },
      
    });
  }

  
}
