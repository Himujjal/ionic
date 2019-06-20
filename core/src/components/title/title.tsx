import { Component, ComponentInterface, Element, Event, EventEmitter, Prop, Watch, h } from '@stencil/core';

import { getIonMode } from '../../global/ionic-global';
import { Color, StyleEventDetail } from '../../interface';
import { createColorClasses } from '../../utils/theme';

@Component({
  tag: 'ion-title',
  styleUrl: 'title.scss',
  shadow: true
})
export class ToolbarTitle implements ComponentInterface {

  @Element() el!: HTMLElement;

  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
   * For more information on colors, see [theming](/docs/theming/basics).
   */
  @Prop() color?: Color;

  /**
   * The size of the toolbar title.
   * Only applies in `ios` mode.
   */
  @Prop() size = 'standard';

  /**
   * Emitted when the styles change.
   */
  @Event() ionStyle!: EventEmitter<StyleEventDetail>;

  @Watch('size')
  protected sizeChanged() {
    this.emitStyle();
  }

  private emitStyle() {
    this.ionStyle.emit({
      [`title-${this.size}`]: true
    });
  }

  private getMode() {
    const mode = getIonMode(this);
    const toolbar = this.el.closest('ion-toolbar');
    return (toolbar && toolbar.mode) || mode;
  }

  componentDidLoad() {
    this.emitStyle();
  }

  hostData() {
    const mode = this.getMode();

    return {
      class: {
        [`${mode}`]: true,
        [`title-${mode}`]: true,
        [`title-${mode}-${this.size}`]: true,

        ...createColorClasses(this.color),
      }
    };
  }

  render() {
    return [
      <div class="toolbar-title">
        <slot></slot>
      </div>
    ];
  }
}
