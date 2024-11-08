import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ButtonModule,
  CardModule,
  ContainerComponent,
  RowComponent,
  ColComponent,
  ButtonDirective
} from '@coreui/angular';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
