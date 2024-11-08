import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderModule, NavModule, ButtonModule } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HeaderModule,
    IconDirective,
    NavModule,
    ButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})

export class HeaderComponent {
  constructor(private authService: AuthService) {}
  @Input() firstRoute: string = "";
  @Input() secondRoute: string = "";
  @Input() thirdRoute: string = "";

  @Output("navigateFirst") onNavigateFirst = new EventEmitter();
  @Output("navigateSecond") onNavigateSecond = new EventEmitter();
  @Output("navigateThird") onNavigateThird = new EventEmitter();

  logout() {
    this.authService.logout();
  }

  navigateFirstRoute() {
    this.onNavigateFirst.emit()
  }

  navigateSecondRoute() {
    this.onNavigateSecond.emit()
  }

  navigateThirdRoute() {
    this.onNavigateThird.emit()
  }


}
