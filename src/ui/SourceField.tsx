import { useRef, useEffect, ChangeEvent } from "react";
import { MessageInputMethod } from "../translation/domain/MessageInputMethod";
import { SourceInfo } from "./SourceInfo";
import { UiInputMode } from "./UiInputMode";

export interface SourceFieldProps {
  sourceInfo: SourceInfo;
  setSourceInfo: (i: SourceInfo) => void;
}

/**
 * Implements the translation source text field,
 * interacts with input methods and supports desktop and mobile workflows
 */
export function SourceField(props: SourceFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  function adjustTextareaHeight() {
    if (textareaRef.current === null) {
      return;
    }
    textareaRef.current.style.height = "1px";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
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

  function handleFocus() {
    props.setSourceInfo({
      ...props.sourceInfo,
      uiInputMode: UiInputMode.UserAgentNative,
    });
  }

  function handleBlur() {
    props.setSourceInfo({
      ...props.sourceInfo,
      uiInputMode: UiInputMode.None,
    });
  }

  ///////////////
  // Rendering //
  ///////////////

  return (
    <textarea
      ref={textareaRef}
      value={props.sourceInfo.text}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{
        resize: "none",
        overflow: "hidden",
      }}
    />
  );
}
