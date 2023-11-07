import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "org-snackbar",
  templateUrl: "./snackbar.component.html",
  styleUrls: ["./snackbar.component.scss"],
})
export class SnackbarComponent {
  @Input() errMsg!: string;
  buttonColor: "blue" | "red" | "green" = "blue";
  buttonText: "Reload" | "Ok" = "Ok";
  buttonSize: "small" | "medium" | "large" = "medium";
  showSnackbar: boolean = true;
  close() {
    this.showSnackbar = false;
  }
}
