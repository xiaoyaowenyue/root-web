/**
 * 进一步对基础模块的导入提炼
 * 有关模块注册指导原则请参考：https://github.com/ng-alain/ng-alain/issues/180
 */
import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { throwIfAlreadyLoaded } from '@core';

import { AlainThemeModule, } from '@delon/theme';
import { DelonACLModule } from '@delon/acl';

// #region reuse-tab
/**
 * 若需要[路由复用](https://ng-alain.com/components/reuse-tab)需要：
 * 1、增加 `REUSETAB_PROVIDES`
 * 2、在 `src/app/layout/default/default.component.html` 修改：
 *  ```html
 *  <section class="alain-default__content">
 *    <reuse-tab></reuse-tab>
 *    <router-outlet></router-outlet>
 *  </section>
 *  ```
 */

const REUSETAB_PROVIDES = [
  // {
  //   provide: RouteReuseStrategy,
  //   useClass: ReuseTabStrategy,
  //   deps: [ReuseTabService],
  // },
];
// #endregion

// #region global config functions

import { PageHeaderConfig } from '@delon/abc';

export function fnPageHeaderConfig(): PageHeaderConfig {
  const pageHeaderConfig = new PageHeaderConfig();
  pageHeaderConfig.homeI18n = 'Alain';
  pageHeaderConfig.autoTitle = false;
  return pageHeaderConfig;
}

import { DelonAuthConfig } from '@delon/auth';

export function fnDelonAuthConfig(): DelonAuthConfig {
  const authConfig = new DelonAuthConfig();
  authConfig.login_url = '/passport/login';
  authConfig.token_send_key = 'Authorization';
  authConfig.token_send_template = 'Bearer ${token}';
  authConfig.token_send_place = 'header';
  return authConfig;
}

import { STConfig } from '@delon/abc';

export function fnSTConfig(): STConfig {
  const stConfig = new STConfig();
  stConfig.req = { reName: { pi: 'page', ps: 'size' } };
  stConfig.modal = { size: 'lg', paramsName: 'record' };
  stConfig.page.front = false;
  return stConfig;
}


const GLOBAL_CONFIG_PROVIDES = [
  // TIPS：@delon/abc 有大量的全局配置信息，例如设置所有 `st` 的页码默认为 `20` 行
  { provide: STConfig, useFactory: fnSTConfig },
  { provide: PageHeaderConfig, useFactory: fnPageHeaderConfig },
  { provide: DelonAuthConfig, useFactory: fnDelonAuthConfig },
];

// #endregion

@NgModule({
  imports: [
    AlainThemeModule.forRoot(),
    DelonACLModule.forRoot(),
  ],
})
export class DelonModule {
  constructor(@Optional() @SkipSelf() parentModule: DelonModule) {
    throwIfAlreadyLoaded(parentModule, 'DelonModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DelonModule,
      providers: [...REUSETAB_PROVIDES, ...GLOBAL_CONFIG_PROVIDES],
    };
  }
}
