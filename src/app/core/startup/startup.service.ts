import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN, User, Menu } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenModel, ITokenService, JWTTokenModel } from '@delon/auth';
import { ACLService } from '@delon/acl';
import { NzIconService } from 'ng-zorro-antd';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';
import { SysService } from 'app/service/sys.service';

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

    zip(
      // this.httpClient.get('http://localhost:4200/assets/tmp/app-data.json')
      this.sysService.findMenus(),
      this.sysService.findUserInfo()
    ).pipe(
      // 接收其他拦截器后产生的异常消息
      catchError(([menuData, userInfo]) => {
        resolve(null);
        return [menuData, userInfo];
      })
    ).subscribe(([menuData, userInfo]) => {

      // application data

      // 用户信息：包括姓名、头像、邮箱地址
      if (userInfo.data != undefined) {
        this.settingService.setUser(userInfo.data);
      }
      // this.settingService.setUser(res.user);
      // ACL：设置权限为全量
      this.aclService.setFull(true);
      // 初始化菜单
      if (menuData.data != undefined) {
        this.menuService.add(menuData.data);
      }

      // 设置页面标题的后缀
      // this.titleService.suffix = 'Alain';
    },
      () => {
      },
      () => {
        resolve(null);
      });
  }

  /**
   * 模拟数据，真实环境中应该废弃
   */
  private viaMock(resolve: any, reject: any) {
    // const tokenData = this.tokenService.get();
    // if (!tokenData.token) {
    //   this.injector.get(Router).navigateByUrl('/passport/login');
    //   resolve({});
    //   return;
    // }
    // mock
    const app: any = {
      name: `ng-alain`,
      description: `Ng-zorro系统框架`
    };

    // 应用信息：包括站点名、描述、年份
    this.settingService.setApp(app);
    // ACL：设置权限为全量
    this.aclService.setFull(true);
    // 初始化菜单
    this.menuService.add([
      {
        text: '主导航',
        group: true,
        children: [
          {
            text: '仪表盘',
            link: '/dashboard',
            icon: { type: 'icon', value: 'appstore' }
          },
          {
            text: '快捷菜单',
            icon: { type: 'icon', value: 'rocket' },
            shortcutRoot: true
          }
        ]
      }
    ]);
    // 设置页面标题的后缀
    this.titleService.suffix = app.name;

    resolve({});
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      //this.viaMock(resolve, reject);
    });
  }
}
