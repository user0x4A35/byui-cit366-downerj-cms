import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';

const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/documents'},
  {path: 'documents', component: DocumentsComponent},
  {path: 'messages', component: MessageListComponent},
  {path: 'contacts', component: ContactsComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
