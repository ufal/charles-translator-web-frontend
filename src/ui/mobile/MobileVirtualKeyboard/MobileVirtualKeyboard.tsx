import { MutableRefObject } from "react";
import { VirtualKeyboard } from "virtualkeyboard";
import { VirtualKbdTargetInterceptor } from "./VirtualKbdTargetInterceptor";
import { IsoLanguage } from "../../../translation/domain/IsoLanguage";
import { keyboardConfig } from "./keyboardConfig.js";

export interface MobileVirtualKeyboardProps {
  readonly sourceFieldRef: MutableRefObject<HTMLTextAreaElement | null>;
  readonly sourceText: string;
  readonly sourceLanguage: IsoLanguage;
  readonly setSourceText: (newText: string) => void;
}

export function MobileVirtualKeyboard(props: MobileVirtualKeyboardProps) {
  // update the real target in the interceptor
  const interceptor = VirtualKbdTargetInterceptor.resolve();
  interceptor.setRealTarget(props.sourceFieldRef.current);

  // prepare the keyboard config
  const config = {
    ...keyboardConfig,
    shown: true, // always shown, instead we destroy this component
    targetId: VirtualKbdTargetInterceptor.ELEMENT_ID, // intercept DOM access

    sourceLanguage: props.sourceLanguage,
    curLayoutIndex: 0,
    curLayoutOrder:
      props.sourceLanguage === "cs"
        ? ["latin", "cyrillicPhonetic", "cyrillic"]
        : ["cyrillic", "cyrillicPhonetic", "latin"],
  };

  return (
    <VirtualKeyboard
      keyboardConfig={config}
      text={props.sourceText}
      callbacks={{
        writer: (newText) => props.setSourceText(newText),
      }}
    />
  );
}
