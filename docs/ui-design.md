# UI Design

This is a rough sketch, needs to be polished.


## Mobile phone layout

- bottom part is the input section
    - because of ergonomics
    - either of:
        - input mode selection buttons
        - OS keyboard
        - ASR controls
        - virtual keyboard
        - HTR drawpad
- top part is the data display
    - the currently inputted message
    - the translation of that message
    - additional metadata (transliterations)
    - additional actions (copy, erase)
    - conversation history (the conversation thread)
- between the two is the language switcher
    - needs to be close to bottom, because of ergonomics and accessibility (the first thing the user usually wants to do is switch or select the language)
    - may contain the "back to input method selection" button (i.e. hide keyboard)


## Desktop layout

- almost the same layout to the mobile, just more spatious
- language switcher moves to the top, above the data display (because of the "AppBar" convention in desktop applications)
- data display becomes wider, side-by-side
- input methods stay at the bottom


## Visualizing input

A text field. Field *focus* controls mobile OS keyboard, so the other input methods must use different visual feedback - different carets. Microphone for ASR, pencil for HTR, another caret for virtual keyboard.
