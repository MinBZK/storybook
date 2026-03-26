import { html } from 'lit';
import './rr-button.ts';
import { ICONS } from './../../content/icon/rr-icon.ts';

/**
 * De Button component is het primaire interactie-element voor gebruikersacties.
 *
 * ## Gebruik
 * ```html
 * <rr-button>Titel</rr-button>
 * ```
 */
export default {
  title: 'Components/Actions/Button',
  component: 'rr-button',
  tags: ['autodocs'],
  parameters: {
    componentSource: {
      file: 'src/components/actions/button/rr-button.ts',
      repository: 'https://github.com/MinBZK/storybook',
    },
    status: {
      type: 'stable',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'destructive',
        'accent-filled',
        'accent-outlined',
        'accent-transparent',
        'neutral-tinted',
        'neutral-transparent',
        'danger-tinted',
      ],
      description: 'Visuele stijlvariant',
      table: {
        defaultValue: { summary: 'neutral-tinted' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
      description: 'Grootte van de knop',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Volledige breedte',
      table: {
        defaultValue: { summary: false },
      },
    },
    text: {
      control: 'text',
      description: 'Tekst van de knop',
    },
    startIcon: {
      control: 'select',
      options: ['', ...ICONS],
      description: 'Icoon voor de tekst',
      table: {
        defaultValue: { summary: '' },
      },
    },
    endIcon: {
      control: 'select',
      options: ['', ...ICONS],
      description: 'Icoon na de tekst',
      table: {
        defaultValue: { summary: '' },
      },
    },
    isExpandable: {
      control: 'boolean',
      name: 'is-expandable',
      description: 'Voegt een chevron toe om aan te geven dat deze knop een menu of popover opent',
      table: {
        defaultValue: { summary: false },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Type attribuut voor formulierverwerking',
      table: {
        defaultValue: { summary: 'button' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Uitgeschakelde toestand',
      table: {
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    variant: 'neutral-tinted',
    size: 'md',
    fullWidth: false,
    text: 'Button',
    startIcon: '',
    endIcon: '',
    isExpandable: false,
    type: 'button',
    disabled: false,
  },
};

const Template = ({
  text,
  variant,
  size,
  fullWidth,
  type,
  startIcon,
  endIcon,
  isExpandable,
  disabled,
}) => html`
  <rr-button
    variant=${variant}
    size=${size}
    ?full-width=${fullWidth}
    type=${type}
    ?is-expandable=${isExpandable}
    ?disabled=${disabled}
  >
    ${startIcon ? html`<rr-icon name=${startIcon}></rr-icon>` : ''} ${text}
    ${endIcon ? html`<rr-icon name=${endIcon}></rr-icon>` : ''}
  </rr-button>
`;

export const Default = Template.bind({});
Default.args = {
  text: 'Button',
};

export const RoleBased = () => html`
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <rr-button variant="primary">Primary</rr-button>
    <rr-button variant="secondary">Secondary</rr-button>
    <rr-button variant="destructive">Destructive</rr-button>
  </div>
`;
RoleBased.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Role based buttons zijn aliases van de appearance based buttons.',
    },
  },
};

export const AppearanceBased = () => html`
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <rr-button variant="accent-filled">Accent Filled</rr-button>
    <rr-button variant="accent-outlined">Accent Outlined</rr-button>
    <rr-button variant="accent-transparent">Accent Transparent</rr-button>
    <rr-button variant="neutral-tinted">Neutral Tinted</rr-button>
    <rr-button variant="neutral-transparent">Neutral Transparent</rr-button>
    <rr-button variant="danger-tinted">Danger Tinted</rr-button>
  </div>
`;
AppearanceBased.parameters = {
  controls: { disable: true },
};

export const Sizes = () => html`
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <rr-button size="md">Medium</rr-button>
    <rr-button size="sm">Small</rr-button>
    <rr-button size="xs">Extra Small</rr-button>
  </div>
`;
Sizes.parameters = {
  controls: { disable: true },
};

export const WithStartIcon = () => html`
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <rr-button size="md">
      <rr-icon name="download"></rr-icon>
      Download
    </rr-button>
    <rr-button size="sm">
      <rr-icon name="download"></rr-icon>
      Download
    </rr-button>
    <rr-button size="xs">
      <rr-icon name="download"></rr-icon>
      Download
    </rr-button>
  </div>
`;
WithStartIcon.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Button met een icoon aan de linkerkant. Plaats een <code>rr-icon</code> vóór de tekst — de positie wordt automatisch gedetecteerd.',
    },
  },
};

export const WithEndIcon = () => html`
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <rr-button size="md">
      Volgende
      <rr-icon name="arrow-right"></rr-icon>
    </rr-button>
    <rr-button size="sm">
      Volgende
      <rr-icon name="arrow-right"></rr-icon>
    </rr-button>
    <rr-button size="xs">
      Volgende
      <rr-icon name="arrow-right"></rr-icon>
    </rr-button>
  </div>
`;
WithEndIcon.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Button met een icoon aan de rechterkant. Plaats een <code>rr-icon</code> ná de tekst — de positie wordt automatisch gedetecteerd.',
    },
  },
};

export const WithBothIcons = () => html`
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <rr-button size="md">
      <rr-icon name="download"></rr-icon>
      Download bestand
      <rr-icon name="arrow-right"></rr-icon>
    </rr-button>
    <rr-button size="sm">
      <rr-icon name="download"></rr-icon>
      Download bestand
      <rr-icon name="arrow-right"></rr-icon>
    </rr-button>
    <rr-button size="xs">
      <rr-icon name="download"></rr-icon>
      Download bestand
      <rr-icon name="arrow-right"></rr-icon>
    </rr-button>
  </div>
`;
WithBothIcons.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Button met zowel een start als end icoon. Plaats een <code>rr-icon</code> vóór én ná de tekst — beide posities worden automatisch gedetecteerd.',
    },
  },
};

export const WithDisclosureIcon = () => html`
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
    <rr-button is-expandable size="md">Opties</rr-button>
    <rr-button is-expandable size="sm">Opties</rr-button>
    <rr-button is-expandable size="xs">Opties</rr-button>
  </div>
`;
WithDisclosureIcon.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story:
        'Button die een menu of popover opent. Gebruik de <code>is-expandable</code> attribute om aan te geven dat deze button een menu of popover opent.',
    },
  },
};
