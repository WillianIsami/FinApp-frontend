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
  @Input() disablePrimaryBtn = true;
  @Output() formSubmit = new EventEmitter();
  @Output() navigate = new EventEmitter();

  emitSubmit(){
    this.formSubmit.emit();
  }

  emitNavigate(){
    this.navigate.emit();
  }
}
