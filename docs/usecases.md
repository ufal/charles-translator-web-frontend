# Usecases

This file lists, categorizes, and prioritizes usecases of the app, so that the app could be designed against them.

> **Assumption:** We assume the primary user knows Czech as their native language.
> ***TODO:** This MUST be measured. It might be that the app is primarily used by Ukrainian refugees given its history. Or that the split is close to 50:50.*

> **Design decision:** We translate at most one paragraph of text at once (cca 250 words / 1250 characters), or the equivalent amount of audio speech (cca 2 minutes). Translating more data would complicate the backend infrastructure as well as requiring a completely different UI. A longer document can be translated by a user paragraph-by-paragraph instead, at the pace they are reading/writing it. This rule therefore also excludes the translation of DOCX, TXT, and PDF files.


## Exhaustive map of usecases

This section provides high-level analysis of all the ways the app can be (now or in the future) used.


### Desktop PC / Laptop

> **Assumption:** Although the app may often be used from desktop PCs without microphone, let's assume the user has a laptop with a microphone built-in so that ASR is available. Let's also assume the laptop has a touch screen, so HTR and on-screen keyboard are also possible input methods. It most likely does not have a useful camera, though we do not support OCR anyways.

- READING: The user comes across a written word, or a document, or a website and wants to understand it.
    - Copy-paste is the best input method.
    - Translating the entire document is not possible due to computational and scope constraints. The user has to do the translation paragraph by paragraph. One paragraph is the largest amount of text we aim to support.
    - Other input methods (hardware/virtual keyboard, OCR, HTR) are only aplicable if the input text is not already digital, in which case the hardware keyboard is the best option for same-script texts and virtual-keyboard or HTR is the best case for different-script texts. The [Screen Capture API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API) can be used to capture audio from other tabs.
    - OCR is useless because of the lack of a good camera (and we also don't support it)
    - ASR is useless here. Maybe if the user knows the source language pronunciation.
- LISTENING: The user comes across a video (or audio) of some other language that they want to translate into their native language.
    - Keyboard, OCR, and HTR is useless here.
    - ASR is the only input method, if the audio source is external of the device.
    - For internal-source audio, we could either support audio/video uploading, or better! do internal device audio capture, just like screen sharing apps do. Uploading files is complicated due to there being no size limit and the user cannot select the section to be translated easily. Being able to record the audio internally, while playing from another audio playback app (say a youtube video), would be a useful feature.
- WRITING: The user wants to create a message in some other language (sending an email or other electronic message, making a physical sign or note).
    - Keyboard input is ok, ASR may speed up the input.
    - OCR and HTR would not be used, since the user types in their native language.
    - The response from the translator will be re-written by hand onto a paper or copy-pasted to another application.
- SPEAKING: Sending an audio-message in non-native language is unlikely, text would be chosen instead. For speaking to a physical person, the conversation usecase applies instead.
- CONVERSATION: The user is approached by a speaker of another language and needs to communicate in real-time.
    - speakers take turns in creating messages
    - either keyboards can be used to produce messages
    - or ASR can be used (and very likely prefered)
    - the history of messages could be preserved for the ease of re-reading if forgotten
    - faulty messages should be easy to delete (say via undo/redo to not accidentally delete an older message)


### Mobile phone

> **Assumption:** The mobile device has a tall-narrow touch screen with virtual OS keyboard (on-screen). It has a camera, microphone, and a speaker.

- READING: The user comes across a written word (or sentence) and wants to understand it.
    - Copy-paste input is ideal when comming across a digital message.
    - Keyboard input is ok for same-script languages.
    - Virtual keyboard for the other script is a feasable input method.
    - OCR would be best for different-script languages, though we do not support that.
    - HTR could be used, but we again don't have that.
    - ASR is useless here. Maybe if the user knows the source language pronunciation.
- LISTENING: The user comes across a video (or audio) of some other language that they want to translate into their native language.
    - Keyboard, OCR, and HTR is useless here.
    - ASR is the only input method.
- WRITING: The user wants to create a message in some other language (sending an email or other electronic message, making a physical sign or note; for more complex texts, the desktop variant will probably be used instead).
    - Keyboard input is ok, ASR may speed up the input.
    - OCR and HTR would not be used, since the user types in their native language.
    - The response from the translator will be re-written by hand onto a paper, re-typed onto another device keyboard, or copy-pasted to another mobile app.
- SPEAKING: Sending an audio-message in non-native language is unlikely, text would be chosen instead. For speaking to a physical person, the conversation usecase applies instead.
- CONVERSATION: The user comes across a speaker of another language and needs to communicate in real-time.
    - speakers take turns in creating messages
    - either keyboards can be used to produce messages
    - or ASR can be used (and very likely prefered)
    - the history of messages could be preserved for the ease of re-reading if forgotten
    - faulty messages should be easy to delete (say via undo/redo to not accidentally delete an older message)


### Tablet

We don't know about (and are having difficulties imagining) people using the translator on a tablet. Therefore for now, there are no usecases here.


### Universal usecases (all-devices)

- Languages need to be change-able quickly, since it is very likely the first action a user does when openning up the app.
    - Language swap when the app has just been openned is a special case of this.
- Language swap when the source textbox is not empty:
    - If the source contains correct language, the textboxes are swapped and reverse-translation is performed.
    - If the source container incorrect language, the message has been copied as-is to the target textbox, so the message swap does effectively nothing and the languages are therefore likely corrected to the proper direction.
- Selecting the input method should be quick, one tap on mobile, one click on the desktop. Right after the selection, the text-entry is initiated, and the user can start writing/speaking/drawing.
- The user should be able to quickly (one-click) reset back to the empty inital state. Especially on the mobile device where text deletion is a lenghty process.
- Transliteration
    - When reading foreign language, the user needs a transliteration of the source into their native language (which is the target language) so that they known how is the text pronounced.
    - When writing foreign language, the user needs a transliteration of the target translation into their native language (which is the source language) so that they know how the result is pronounced.
    - In either case, one of the two transliterations is not necessary, but in a dialogue of two people, both are useful.


## Primary usecases

This section lists the usecases used by the majority of users.

> **TODO:** These need to be measured (no speculations)!


## Observed usecase examples

The following is a list of known usecases with specifics (i.e. someone actually used the translator in that way).

- The uk-cs only translator was provided to ukrainian students at a university during exams, so that they could use it to translate the czech assignment. It was provided on a desktop PC.
- The translator app has been used and navigated by a blind user via a screen reader software.

> **TODO:** Gather more examples. Verified examples (no speculations)!
