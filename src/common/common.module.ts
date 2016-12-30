import { NgModule } from '@angular/core';

import { UtilityService } from "./utility.service";


export const COMMON_SERVICES = [
    UtilityService
];


@NgModule({
    providers: [COMMON_SERVICES]
})
export class CommonModule {}