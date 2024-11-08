import { Component } from '@angular/core';
import { FooterModule } from '@coreui/angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FooterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
