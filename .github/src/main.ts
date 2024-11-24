// src/main.ts
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { ChatQueriesComponent } from './app/components/chat-queries/chat-queries.component';

bootstrapApplication(ChatQueriesComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)), // Importa y configura RouterModule
    provideHttpClient(),
  ],
}).catch(err => console.error(err));
