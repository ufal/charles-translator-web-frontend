/**
 * Whenever the virtual keyboard does a `document.getElementById(targetId)`,
 * this element is designed to capture that and route a to a given
 * text area or input, while capturing events that we don't want to leak
 */
export class VirtualKbdTargetInterceptor extends HTMLElement {
  /**
   * The "tag name" of the custom element
   */
  static readonly CUSTOM_ELEMENT_NAME = "virtual-kbd-target-interceptor";

  /**
   * The HTML ID of the only instance of this element
   */
  static readonly ELEMENT_ID = "virtualKbdTargetInterceptorInstance";

  constructor() {
    super();
  }

  static registerCustomElement() {
    if (
      !window.customElements.get(
        VirtualKbdTargetInterceptor.CUSTOM_ELEMENT_NAME,
      )
    ) {
      window.customElements.define(
        VirtualKbdTargetInterceptor.CUSTOM_ELEMENT_NAME,
        VirtualKbdTargetInterceptor,
      );
    }
  }

  /**
   * Returns (while possibly creating) the singleton instance of the interceptor
   */
  static resolve(): VirtualKbdTargetInterceptor {
    let instance = document.getElementById(
      VirtualKbdTargetInterceptor.ELEMENT_ID,
    );

    if (instance === null) {
      VirtualKbdTargetInterceptor.registerCustomElement();
      instance = document.createElement(
        VirtualKbdTargetInterceptor.CUSTOM_ELEMENT_NAME,
      );
      document.body.appendChild(instance);
    }

    if (!(instance instanceof VirtualKbdTargetInterceptor)) {
      throw Error(
        "There is an unexpected element with ID " +
          VirtualKbdTargetInterceptor.ELEMENT_ID,
      );
    }

    return instance;
  }

  connectedCallback() {
    // set the proper ID
    this.id = VirtualKbdTargetInterceptor.ELEMENT_ID;

    // make the element invisible, since it's only an interceptor
    this.style.display = "none";
    this.tabIndex = -1;
    this.inert = true;
  }

  //////////////////////////////
  // Managing the real target //
  //////////////////////////////

  private _realTarget: HTMLTextAreaElement | HTMLInputElement | null = null;

  private get realTarget(): HTMLTextAreaElement | HTMLInputElement {
    if (this._realTarget === null) {
      throw new Error("VirtKbd Interceptor is missing the real target.");
    }
    return this._realTarget;
  }

  setRealTarget(realTarget: HTMLTextAreaElement | HTMLInputElement | null) {
    this._realTarget = realTarget;
  }

  ////////////////////////
  // Incerception logic //
  ////////////////////////

  get tagName(): string {
    return this.realTarget.tagName;
  }

  get value(): string {
    return this.realTarget.value;
  }

  set value(v: string) {
    this.realTarget.value = v;
  }

  get selectionStart(): number | null {
    return this.realTarget.selectionStart;
  }

  get selectionEnd(): number | null {
    return this.realTarget.selectionEnd;
  }

  focus() {
    this.realTarget.focus();
  }

  addEventListener(
    target: string,
    listener: EventListenerOrEventListenerObject,
  ) {
    this.realTarget.addEventListener(target, listener);
  }

  removeEventListener(
    target: string,
    listener: EventListenerOrEventListenerObject,
  ) {
    this.realTarget.removeEventListener(target, listener);
  }

  // EXPLICITLY NOT FORWARDED PROPERTIES
  // -----------------------------------
  // ".style"
  //    used to disable outline, I handle that myself
  // ".setAttribute"
  //    used for inputmode="none" to hide OS keyboard, I handle that myself
}
