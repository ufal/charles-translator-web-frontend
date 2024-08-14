import { useRef, useEffect, ChangeEvent, MutableRefObject } from "react";
import { MessageInputMethod } from "../../translation/domain/MessageInputMethod";
import { SourceInfo } from "../SourceInfo";
import { UiInputModeController } from "./UiInputModeController";

export interface SourceFieldProps {
  readonly sourceFieldRef: MutableRefObject<HTMLTextAreaElement | null>;
  readonly uiInputModeController: UiInputModeController;
  readonly sourceInfo: SourceInfo;
  readonly setSourceInfo: (i: SourceInfo) => void;
}

/**
 * Implements the translation source text field,
 * interacts with input methods and supports desktop and mobile workflows
 */
export function SourceField(props: SourceFieldProps) {
  function adjustTextareaHeight() {
    const element = props.sourceFieldRef.current;
    if (element === null) return;
    element.style.height = "1px";
    element.style.height = element.scrollHeight + "px";
  }

  useEffect(() => {
    adjustTextareaHeight();
  }, [props.sourceInfo.text]);

  ////////////////////
  // Event Handlers //
  ////////////////////

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    // figure out the input method
    let inputMethod = MessageInputMethod.Keyboard;
    const inputType = (e.nativeEvent as InputEvent).inputType;
    if (inputType === "insertFromPaste") {
      inputMethod = MessageInputMethod.Clipboard;
    }
    if (inputType === "insertFromPasteAsQuotation") {
      inputMethod = MessageInputMethod.Clipboard;
    }
    if (inputType === "insertFromDrop") {
      inputMethod = MessageInputMethod.Clipboard;
    }
    if (inputType === "insertFromYank") {
      inputMethod = MessageInputMethod.Clipboard;
    }

    // get the new source text
    const newSourceText = e.target.value;

    // modify the state
    props.setSourceInfo({
      ...props.sourceInfo,
      text: newSourceText,
      messageInputMethod: inputMethod,
    });

    // adjust textarea height
    adjustTextareaHeight();
  }

  ///////////////
  // Rendering //
  ///////////////

  return (
    <textarea
      ref={props.sourceFieldRef}
      value={props.sourceInfo.text}
      placeholder="Enter text"
      onChange={handleChange}
      onFocus={props.uiInputModeController.onSourceFieldFocus}
      onBlur={props.uiInputModeController.onSourceFieldBlur}
      inputMode={props.uiInputModeController.sourceFieldInputMode}
      style={{
        fontSize: "30px",
        resize: "none",
        width: "100%",
        overflow: "hidden",
        background: "none",
        border: "none",
        borderRadius: "0",
        outline: "none",
        padding: "0",
        margin: "0",
      }}
    />
  );
}
