import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewportScroller } from '@angular/common';

// Height of the fixed navbar, plus a little breathing room. ViewportScroller
// scrolls to the element's raw offset and ignores CSS scroll-margin, so
// without this every anchor target lands underneath the navbar.
const NAV_OFFSET = 90;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(viewportScroller: ViewportScroller) {
    viewportScroller.setOffset([0, NAV_OFFSET]);
  }
}
