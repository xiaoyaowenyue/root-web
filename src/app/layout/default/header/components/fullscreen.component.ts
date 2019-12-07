import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';
import * as screenfull from 'screenfull';

@Component({
  selector: 'header-fullscreen',
  template: `
    <i nz-icon [type]="status ? 'fullscreen-exit' : 'fullscreen'"></i>
    {{ status ? '退出全屏' : '全屏' }}
  `,
  host: {
    '[class.d-block]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderFullScreenComponent {
  status = false;

  @HostListener('window:resize')
  _resize() {
    this.status = (screenfull as screenfull.Screenfull).isFullscreen;
  }

  @HostListener('click')
  _click() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
