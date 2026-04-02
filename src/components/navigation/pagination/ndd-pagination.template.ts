import { html, nothing, TemplateResult } from 'lit';
import type { NDDPagination } from './ndd-pagination.ts';
import '../../actions/icon-button/ndd-icon-button.ts';
import '../../content/icon/ndd-icon.ts';

export function paginationTemplate(component: NDDPagination): TemplateResult {
	const pages = component._getVisiblePages();
	const atFirst = component.current <= 1;
	const atLast = component.current >= component.total;
	const t = component._t.bind(component);
	const hasHref = !!component.hrefPattern;

	const renderPageButton = (page: number) => {
		const isCurrent = page === component.current;
		const label = t('components.pagination.page-number-text', { page });

		if (hasHref) {
			return html`
				<a class="pagination__page-button ${isCurrent ? 'is-current' : ''}"
					href=${component._hrefForPage(page)}
					aria-label=${label}
					aria-current=${isCurrent ? 'page' : nothing}
				>
					<div class="pagination__page-button-indicator"></div>
					<div class="pagination__page-button-text">${page}</div>
				</a>
			`;
		}

		return html`
			<button class="pagination__page-button ${isCurrent ? 'is-current' : ''}"
				type="button"
				aria-label=${label}
				aria-current=${isCurrent ? 'page' : nothing}
				@click=${() => component._goToPage(page)}
			>
				<div class="pagination__page-button-indicator"></div>
				<div class="pagination__page-button-text">${page}</div>
			</button>
		`;
	};

	return html`
		<nav class="pagination"
			aria-label=${t('components.pagination.label-text')}
		>
			<ndd-icon-button
				icon="chevron-left-small"
				text=${t('components.pagination.previous-action')}
				variant="neutral-tinted"
				?disabled=${atFirst}
				href=${hasHref && !atFirst ? component._hrefForPage(component.current - 1) : nothing}
				@click=${hasHref ? nothing : () => component._goToPage(component.current - 1)}
			></ndd-icon-button>
			<div class="pagination__divider" aria-hidden="true">
				<div class="pagination__divider-line"></div>
			</div>
			<div class="pagination__page-buttons">
				${pages.map((page) =>
					page === 'ellipsis'
						? html`<div class="pagination__ellipsis" aria-hidden="true">&hellip;</div>`
						: renderPageButton(page as number)
				)}
			</div>
			<div class="pagination__compact">
				<div class="pagination__select-wrapper">
					<select class="pagination__select"
						aria-label=${t('components.pagination.go-to-page-action')}
						@change=${(e: Event) => {
							const page = Number((e.target as HTMLSelectElement).value);
							if (hasHref) {
								window.location.href = component._hrefForPage(page);
							} else {
								component._goToPage(page);
							}
						}}
					>
						${Array.from({ length: component.total }, (_, i) => i + 1).map((page) => html`
							<option value=${page} ?selected=${page === component.current}>${page} / ${component.total}</option>
						`)}
					</select>
					<div class="pagination__select-picker-icon">
						<ndd-icon name="chevron-up-down"></ndd-icon>
					</div>
				</div>
			</div>
			<div class="pagination__divider" aria-hidden="true">
				<div class="pagination__divider-line"></div>
			</div>
			<ndd-icon-button
				icon="chevron-right-small"
				text=${t('components.pagination.next-action')}
				variant="neutral-tinted"
				?disabled=${atLast}
				href=${hasHref && !atLast ? component._hrefForPage(component.current + 1) : nothing}
				@click=${hasHref ? nothing : () => component._goToPage(component.current + 1)}
			></ndd-icon-button>
		</nav>
	`;
}
