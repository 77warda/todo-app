import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "org-snackbar",
  templateUrl: "./snackbar.component.html",
  styleUrls: ["./snackbar.component.scss"],
})
export class SnackbarComponent {
  @Input() errMsg!: string;
  showSnackbar: boolean = true;
  close() {
    this.showSnackbar = false;
  }
}
