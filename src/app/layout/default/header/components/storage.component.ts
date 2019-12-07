import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'header-storage',
  template: `
  <i nz-icon nzType="tool"></i>
  清理本地缓存
  `,
  host: {
    // 给当前元素添加一个class，让他变成块级元素，
    // 这样整个<header-storage>就能撑满父级元素，就能让用户很好的点击到它了
    '[class.d-block]': 'true'
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
