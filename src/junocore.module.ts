import { NgModule } from '@angular/core';

import { COMMON_SERVICES, CommonModule } from './common/common.module';
export * from './common/common.module';

@NgModule({
  providers: [COMMON_SERVICES]
})
export class JunoCoreModule { }
