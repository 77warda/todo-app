import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { Component } from "@angular/core";

@Component({
  selector: "org-introduction",
  templateUrl: "./introduction.component.html",
  styleUrls: ["./introduction.component.scss"],
  // animations: [
  //   trigger("openClose", [
  //     // ...
  //     state(
  //       "open",
  //       style({
  //         height: "200px",
  //         opacity: 1,
  //         backgroundColor: "yellow",
  //         color: "#000",
  //       })
  //     ),
  //     state(
  //       "closed",
  //       style({
  //         height: "100px",
  //         opacity: 0.8,
  //         backgroundColor: "blue",
  //         color: "#fff",
  //       })
  //     ),
  //     transition("open => closed", [animate("1s")]),
  //     transition("closed => open", [animate("0.5s")]),
  //   ]),
  // ],
  animations: [
    trigger("openClose", [
      state(
        "open",
        style({
          height: "200px",
          opacity: 1,
          backgroundColor: "yellow",
          color: "#000",
        })
      ),
      state(
        "closed",
        style({
          height: "100px",
          opacity: 0.8,
          backgroundColor: "blue",
          color: "#fff",
        })
      ),
      // transition("* => closed", [animate("1s")]),
      // transition("* => open", [animate("0.5s")]),
      transition("open <=> closed", [animate("1s")]),
    ]),
  ],
})
export class IntroductionComponent {
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
