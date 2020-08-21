import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import {
  MatToolbarModule,
  MatDialogModule,
  MatInputModule,
} from "@angular/material";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { AddDialogComponent } from "./add-dialog/add-dialog.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, AddDialogComponent],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    HttpClientModule,
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
  entryComponents: [AddDialogComponent],
})
export class AppModule {}
