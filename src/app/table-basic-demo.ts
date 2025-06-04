import { Component, OnInit, signal } from '@angular/core';
import { ImportsModule } from './imports';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BaseEventFormComponent } from './base-event-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SportEventFormComponent } from './sport-event-form.component';

export interface Col {
  id: number;
  name: string;
  type: string;
}

export interface Data {
  id: number;
  title: string;
  description: string;
  location: string;
  type: string;
}
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
  ],
  providers: [ProductService, ConfirmationService, MessageService],
})
export class TableBasicDemo implements OnInit {
  products!: Product[];

  constructor(
    public confirmationService: ConfirmationService,
    public messageService: MessageService
  ) {}
  public cols = signal<Col[]>([
    { id: 1, name: 'Наименование', type: 'title' },
    { id: 2, name: 'Описание ', type: 'description' },
    { id: 3, name: 'Локация', type: 'location' },
    { id: 4, name: 'Тип', type: 'type' },
  ]);

  public data = signal<Data[]>([
    {
      id: 1,
      title: 'Выставка современного искусства',
      description:
        'Крупнейшая выставка современных художников со всего мира. Включает инсталляции, цифровое искусство и живопись.',
      location: 'Государственный музей изобразительных искусств',
      type: 'Выставка',
    },
    {
      id: 2,
      title: 'Технологическая конференция DevConf 2023',
      description:
        'Ежегодная конференция для разработчиков с докладами о последних тенденциях в IT.',
      location: 'Крокус Экспо, Москва',
      type: 'Конференция',
    },
    {
      id: 3,
      title: "Джазовый фестиваль 'Осенние ритмы'",
      description:
        'Международный фестиваль джазовой музыки с участием мировых звезд жанра.',
      location: 'Зарядье, Москва',
      type: 'Фестиваль',
    },
    {
      id: 4,
      title: 'Мастер-класс по кулинарии',
      description:
        'Практический мастер-класс от шеф-повара по приготовлению итальянской пасты.',
      location: "Кулинарная студия 'Вкусные истории'",
      type: 'Мастер-класс',
    },
    {
      id: 5,
      title: "Благотворительный забег 'Беги ради жизни'",
      description:
        'Ежегодный благотворительный забег на 5 и 10 км. Все собранные средства пойдут в детские хосписы.',
      location: 'Парк Горького',
      type: 'Спортивное мероприятие',
    },
  ]);

  public formCols = [
    { id: 1, name: 'Название ' },
    { id: 2, name: 'Описание ' },
    { id: 3, name: 'Место проведения' },
  ];

  public visible = false;
  public mode: 'create' | 'edit' = 'create';
  public selectedElems: any;

  ngOnInit() {}

  create() {
    this.visible = true;
    this.mode = 'create';
  }

  public formGroup: FormGroup;
  public getGroup(v) {
    console.log('v', v);
    this.formGroup = v;
  }
  edit() {
    this.visible = true;
    this.mode = 'edit';

    this.formGroup.get('name').setValue(this.selectedElems.title);
    this.formGroup.get('description').setValue(this.selectedElems.description);
    this.formGroup.get('place').setValue(this.selectedElems.location);
  }

  confirm() {
    this.confirmationService.confirm({
      header: 'Вы уверены, что хотите удалить запись?',
      acceptLabel: 'Удалить',
      rejectLabel: 'Отменить',
      accept: () => {
        this.data.update((v) => {
          return v.filter((v) => v.id !== this.selectedElems.id);
        });
      },
      reject: () => {},
    });
  }

  //   public submit() {
  //     console.log(this.formGroup);
  //     if (this.mode === 'create') {
  //       this.data.push({
  //         id: Math.random(),
  //         title: this.formGroup.get('name').value,
  //         description: this.formGroup.get('description').value,
  //         location: this.formGroup.get('place').value,
  //         type: '',
  //       });
  //     } else {
  //       const elemIndex = this.data.findIndex(
  //         (v) => v.id === this.selectedElems.id
  //       );

  //       this.data[elemIndex] = {
  //         id: this.selectedElems.id,
  //         title: this.formGroup.get('name').value,
  //         description: this.formGroup.get('description').value,
  //         location: this.formGroup.get('place').value,
  //         type: this.selectedElems.type,
  //       };
  //     }
  //     this.visible = false;
  //   }
}
