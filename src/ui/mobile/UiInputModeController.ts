import { Dispatch, MutableRefObject, useRef, useState } from "react";
import { UiInputMode } from "./UiInputMode";

const KEYBOARD_MODES = [
  UiInputMode.UserAgentNative,
  UiInputMode.VirtualKeyboard,
];

export interface UiInputModeControllerProps {
  readonly sourceFieldRef: MutableRefObject<HTMLTextAreaElement | null>;
}

export interface UiInputModeController {
  readonly uiInputMode: UiInputMode;
  readonly lastKeyboardInputMode: UiInputMode;
  readonly sourceFieldInputMode: "none" | undefined;
  readonly setUiInputMode: Dispatch<UiInputMode>;
  readonly onSourceFieldFocus: () => void;
  readonly onSourceFieldBlur: () => void;
}

/**
 * Ensures that the "uiInputMode" state interacts well with the SourceField
 * (this state should drive the source field, while also reacting to focus
 * and blur events of the field)
 */
export function useUiInputModeController(
  props: UiInputModeControllerProps,
): UiInputModeController {
  /**
   * This state drives the input mode of the application,
   * it controls the displayed input mode and the focus of the source field
   */
  const [uiInputMode, setUiInputMode] = useState<UiInputMode>(UiInputMode.None);

  // keeping track of the last used keyboard, so that when the source field
  // gets focus, the proper keyboard is shown
  const [lastKeyboardInputMode, setLastKeyboardInputMode] =
    useState<UiInputMode>(UiInputMode.UserAgentNative);

  // set to true just before we call the focus or blur on the source field
  // ourselves, to skip the execution of the corresponding event handler
  const internalFocusBlurTriggerRef = useRef<boolean>(false);

  // setting the source field inputmode attribute to "none" hides
  // the OS keyboard
  const sourceFieldInputMode =
    uiInputMode !== UiInputMode.UserAgentNative ? "none" : undefined;

  function updateSourceField(newMode: UiInputMode) {
    const element = props.sourceFieldRef.current;
    if (element === null) return;

    // focus mirrors the "None" input mode
    if (newMode !== UiInputMode.None) {
      internalFocusBlurTriggerRef.current = true;
      element.focus();
    } else {
      internalFocusBlurTriggerRef.current = true;
      element.blur();
    }
  }

  /**
   * Someone external wants to change the UI input mode
   */
  function externalSetUiInputMode(newMode: UiInputMode) {
    setUiInputMode(newMode);

    // remember the last used keyboard (if it is a keyboard)
    if (KEYBOARD_MODES.indexOf(newMode) !== -1) {
      setLastKeyboardInputMode(newMode);
    }

    // update source field attributes
    updateSourceField(newMode);
  }

  /**
   * Called when the source field is focused
   */
  function onSourceFieldFocus() {
    // skip focuses that we ourselves trigger as a response to a state change
    if (internalFocusBlurTriggerRef.current) {
      internalFocusBlurTriggerRef.current = false;
      return;
    }

    // the user clicked on the field, show a keyboard
    setUiInputMode(lastKeyboardInputMode);
  }

  /**
   * Called when the source field is blured
   */
  function onSourceFieldBlur() {
    // skip blurs that we ourselves trigger as a response to a state change
    if (internalFocusBlurTriggerRef.current) {
      internalFocusBlurTriggerRef.current = false;
      return;
    }

    // the user clicked elsewhere, hide all input mehtods
    setUiInputMode(UiInputMode.None);
  }

  return {
    uiInputMode,
    lastKeyboardInputMode,
    sourceFieldInputMode,
    setUiInputMode: externalSetUiInputMode,
    onSourceFieldFocus,
    onSourceFieldBlur,
  };
}
