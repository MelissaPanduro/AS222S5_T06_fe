import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatbotListComponent } from './components/chatbot-list/chatbot-list.component';
import { ChatbotDetailsComponent } from './components/chatbot-details/chatbot-details.component';
import { ChatbotFormComponent } from './components/chatbot-form/chatbot-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'chatbot', pathMatch: 'full' },
  { path: 'chatbot', component: ChatbotListComponent },
  { path: 'chatbot/:id', component: ChatbotDetailsComponent },
  { path: 'chatbot/new', component: ChatbotFormComponent },
  { path: 'chatbot/edit/:id', component: ChatbotFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}