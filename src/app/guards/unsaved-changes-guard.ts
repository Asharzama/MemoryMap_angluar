import { CanDeactivateFn } from '@angular/router';
import { CanLeavePage } from './unsaved-changes';

export const unsavedChangesGuard: CanDeactivateFn<CanLeavePage> = (component) => {
  return component.canDeactivate();
};
