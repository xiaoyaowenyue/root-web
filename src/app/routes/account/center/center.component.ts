import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { environment } from '@env/environment';
import { SysUserService } from 'app/service/sys-user.service';
import { NzMessageService } from 'ng-zorro-antd';
import { SysService } from 'app/service/sys.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CenterComponent implements OnInit {

  constructor(
    private router: Router,
    private settings: SettingsService,
    private sysService: SysService,
    private message: NzMessageService) { }

  serverUrl: string = environment.SERVER_URL
  password: string | null = null;

  tabs: any[] = [
    {
      key: 'my-award',
      tab: '我的奖项',
    },
    {
      key: 'my-score',
      tab: '我的成绩',
    },
    {
      key: 'projects',
      tab: '项目',
    },
  ];

  pos = 0;


  ngOnInit() {
    this.setActive();
  }

  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    const idx = this.tabs.findIndex(w => w.key === key);
    if (idx !== -1) this.pos = idx;
  }


  changePassword(ev) {
    let pwd = this.password;
    this.password = '';

    if (pwd == null || pwd.length < 6) {
      this.message.error("密码不能少于6位");
    } else {
      this.sysService.updatePassword(pwd).subscribe(result => {
        if (result.code == 200) {
          this.message.success(result.msg);
        } else {
          this.message.error(result.msg);
        }
      });
    }

  }

  to(item: any) {
    this.router.navigateByUrl(`/account/center/${item.key}`);
  }

}
