import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { ChatInterfaceComponent } from './app/components/chat-interface/chat-interface.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatInterfaceComponent],
  template: `
    <app-chat-interface></app-chat-interface>
  `
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    provideHttpClient()
  ]
}).catch(err => console.error(err));