/**
 * Minimum ms between popover close and reopen to prevent iOS
 * touch light-dismiss from immediately reopening the popover.
 *
 * On iOS, tapping the anchor to close a popover triggers light dismiss
 * first (closing the popover), then the click handler fires and would
 * reopen it. This guard prevents reopening within the threshold.
 */
export const POPOVER_REOPEN_GUARD_MS = 50;
