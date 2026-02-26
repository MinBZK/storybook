import { css } from 'lit';

export const breakpoints = {
	sm: {
		min: css`320px`,
		max: css`640px`,
	},
	md: {
		min: css`641px`,
		max: css`1007px`,
	},
	lg: {
		min: css`1008px`,
	},
} as const;
