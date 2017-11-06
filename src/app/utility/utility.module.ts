import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiManagerService} from './shared-service/api-manager.service';
import {PaginationComponent} from './shared-components/pagination/pagination.component';
import {ProgressHudComponent} from './shared-components/progress-hud/progress-hud.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PaginationComponent, ProgressHudComponent],
  providers: [ApiManagerService],
  exports: [PaginationComponent, ProgressHudComponent]
})
export class UtilityModule {
}
