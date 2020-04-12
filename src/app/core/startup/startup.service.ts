import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN, User, Menu } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenModel, ITokenService, JWTTokenModel } from '@delon/auth';
import { ACLService } from '@delon/acl';
import { NzIconService } from 'ng-zorro-antd';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';
import { SysService } from 'app/routes/sys/sys.service';
import { flatMap } from 'rxjs/operators';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN)
    private tokenService: ITokenService,
    private injector: Injector,
    private sysService: SysService
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaHttp(resolve: any, reject: any) {
    const tokenData = this.tokenService.get();
    if (!tokenData.token) {
      this.injector.get(Router).navigateByUrl('/passport/login');
      resolve({});
      return;
    }

    this.sysService.findUserInfo().subscribe((result) => {

      // application data

      // 用户信息：包括姓名、头像、邮箱地址
      let userInfo = result.data;
      let user = { "username": userInfo.username, "nickname": userInfo.nickname, "avatar": userInfo.avatar, "email": userInfo.email }
      this.settingService.setUser(user);
      // ACL：设置权限为全量
      this.aclService.setFull(true);
      // 初始化菜单
      if (userInfo.menus != undefined) {
        this.menuService.add(userInfo.menus);
      }

      // 设置页面标题的后缀
      this.titleService.suffix = 'Alain';
    },
      () => {
      },
      () => {
        resolve(null);
      });
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      this.viaHttp(resolve, reject);
    });
  }

}
