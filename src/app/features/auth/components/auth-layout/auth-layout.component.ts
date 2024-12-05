import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {
  @Input() title = "";
  @Input() primaryBtnText = "";
  @Input() secondaryBtnText = "";
  @Output('submit') onSubmit = new EventEmitter();
  @Output('navigate') onNavigate = new EventEmitter();

  emitSubmit(){
    this.onSubmit.emit();
  }

  emitNavigate(){
    this.onNavigate.emit();
  }
}
