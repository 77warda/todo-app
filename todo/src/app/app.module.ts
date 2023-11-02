import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NewTodosComponent } from "./new-todos/new-todos.component";
import { HttpClientModule } from "@angular/common/http";
import { LoaderComponent } from "./loader/loader.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { SnackbarComponent } from "./snackbar/snackbar.component";

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    NewTodosComponent,
    LoaderComponent,
    TodoListComponent,
    SnackbarComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
