import { useRef, useCallback } from "react";
import debounce from "debounce-promise";
import { translationGraph } from "../translation";
import { IsoLanguage } from "../translation/domain/IsoLanguage";
import { MessageInputMethod } from "../translation/domain/MessageInputMethod";
import { Message } from "../translation/domain/Message";
import { User } from "../translation/domain/User";
import { TranslationError } from "../translation/domain/TranslationError";
import { privacyPreferencesRepository } from "../persistence/PrivacyPreferencesRepository";
import { userPreferencesRepository } from "../persistence/UserPreferencesRepository";
import { TargetInfo } from "./TargetInfo";

const TRANSLATION_DEBOUNCE_MS = 500;

export interface TranslationControllerProps {
  readonly targetInfo: TargetInfo,
  readonly setTargetInfo: (t: TargetInfo) => void,
}

export type RequestTranslationFunciton = (
  text: string,
  from: IsoLanguage,
  to: IsoLanguage,
  inputMethod: MessageInputMethod
) => void;

export interface TranslationController {
  readonly requestTranslation: RequestTranslationFunciton,
  readonly clearRequestPipeline: () => void,
}

/**
 * Translation controller is the set of functionality that sends
 * translation requests to the backend and accepts responses,
 * plus detects networking errors
 */
export function useTranslationController(
  props: TranslationControllerProps
): TranslationController {
  const lastSentRequestNumber = useRef<number>(0);
  const lastReceivedRequestNumber = useRef<number>(0);
  
  /**
   * Performs the actual translation request to the backend
   */
  const performTranslation = useCallback(async (
    text: string,
    from: IsoLanguage,
    to: IsoLanguage,
    inputMethod: MessageInputMethod
  ) => {
    // find the translation path
    const translationPath = translationGraph.getPath(from, to);
    if (translationPath === null) {
      props.setTargetInfo({
        ...props.targetInfo,
        loadingError: "Cannot translate between these two languages.",
        isLoading: false,
      });
      return;
    }

    // prepare message author metadata
    const privacyPreferences = privacyPreferencesRepository.load();
    const userPreferences = userPreferencesRepository.load();
    const author = new User(
      privacyPreferences?.allowsDataCollection ?? false,
      userPreferences.organizationName
    );
    
    // track the request in the context of other requests
    lastSentRequestNumber.current += 1;
    const requestNumber = lastSentRequestNumber.current;

    // do the API call(s)
    const result = await translationPath.executeOn(new Message({
      language: from,
      text: text,
      author: author,
      isOriginal: true, // i.e. is not a translated message
      originalInputMethod: inputMethod
    }));

    // do nothing if some later request finished faster than us
    // (we are obsolete in such a case)
    if (lastReceivedRequestNumber.current > requestNumber) {
      return;
    }
    lastReceivedRequestNumber.current = requestNumber;

    // define target info variables to override
    let targetText = props.targetInfo.text;
    let isLoading = props.targetInfo.isLoading;
    let loadingError = props.targetInfo.loadingError;

    // hide the loader if we are the last sent out request
    // (i.e. there are no other pending requests)
    if (lastSentRequestNumber.current === requestNumber) {
      isLoading = false;
    }

    // process any errors
    if (result instanceof TranslationError) {
      targetText = "";
      loadingError = result.message;  
      console.error(result);
    }

    // process a successful response
    if (result instanceof Message) {
      targetText = result.text.trim();
      loadingError = null;
    }

    // override variables
    props.setTargetInfo({
      ...props.targetInfo,
      text: targetText,
      isLoading: isLoading,
      loadingError: loadingError,
    })
  }, []);

  const performTranslationDebounced = useCallback<typeof performTranslation>(
    debounce(performTranslation, TRANSLATION_DEBOUNCE_MS), []
  );

  /**
   * Calling this function will schedule a translation request to be sent.
   * This method handles debouncing. Call it anytime the source text,
   * or the two languages are changed. You can call it multiple times.
   * It is automatically called from the method that change these individual
   * values, except for the raw state-setters by react.
   */
  function requestTranslation(
    text: string,
    from: IsoLanguage,
    to: IsoLanguage,
    inputMethod: MessageInputMethod
  ) {
    // show the loader as soon as someone starts typing
    props.setTargetInfo({
      ...props.targetInfo,
      isLoading: true,
    });

    // trigger debounced actions in parallel
    performTranslationDebounced(text, from, to, inputMethod);
  }

  /**
   * Cancels all running requests and sets the target field to empty
   */
  function clearRequestPipeline() {
    lastSentRequestNumber.current += 1;
    lastReceivedRequestNumber.current = lastSentRequestNumber.current;
    props.setTargetInfo({
      ...props.targetInfo,
      text: "",
      isLoading: false,
      loadingError: null,
    });
  }

  return {
    requestTranslation,
    clearRequestPipeline
  };
}
