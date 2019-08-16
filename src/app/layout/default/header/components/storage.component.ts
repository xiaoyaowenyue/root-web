import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'header-storage',
  template: `
  <i nz-icon type="tool"></i>
  清理本地缓存
  `,
  host: {
    '[class.d-block]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderStorageComponent {
  constructor(private modalSrv: NzModalService, private messageSrv: NzMessageService) {}

  @HostListener('click')
  _click() {
    this.modalSrv.confirm({
      nzTitle: '清理缓存需要重新登录，确定清理吗？',
      nzOnOk: () => {
        localStorage.clear();
        this.messageSrv.success('清理成功!');
      },
    });
  }
}
