/**
 * Specific feature for inputting Czech language.
 * Czech language consists of letters with accent, either with
 *   - "čárka", i.e. ěčďřšťžň,
 *   - "háček", i.e. áéíóúý,
 *   - and one special character "ů"
 *      (which is treated as "háček" because "čárka" is already occupied by "ú").
 * @param pluginState
 * @param setPluginState
 * @param whichKey
 * @returns {*}
 */
const hacekCarkaFeature = (pluginState, setPluginState, whichKey) => {
    if (pluginState.nextWithHacek && whichKey === 'ˇ') {
        setPluginState({
            ...pluginState,
            nextWithHacek: false,
            toggle: false
        })
    } else if (pluginState.nextWithCarka && whichKey === '´') {
        setPluginState({
            ...pluginState,
            nextWithCarka: false,
            toggle: false
        })
    } else {
        if (whichKey === 'ˇ') {
            setPluginState({
                ...pluginState,
                nextWithHacek: true,
                nextWithCarka: false,
                toggle: 'ˇ'
            })
        } else if (whichKey === '´') {
            setPluginState({
                ...pluginState,
                nextWithHacek: false,
                nextWithCarka: true,
                toggle: '´'
            })
        }
    }
}

/**
 * Translate character `whichKey` based on if prior pressed key was "hacek" or "carka".
 * @param state - state of the virtual keyboard
 * @param pluginState - shared state owned by all the plugins
 * @param setPluginState - method for setting the shared plugin state
 * @param whichKey - key label which was pressed e.g. "a" or "b", ...
 * @returns {*} - mapped key (e.g. if "čárka" was pressed, then "e" was pressed, it will translate to "é")
 */
const hacekCarkaTransformer = (state, pluginState, setPluginState, whichKey) => {
    const lWhichKey = whichKey.toLowerCase()
    const hacekMapping = {
        'e': 'ě',
        'c': 'č',
        'd': 'ď',
        'r': 'ř',
        's': 'š',
        't': 'ť',
        'z': 'ž',
        'n': 'ň',
        'u': 'ů'
    }

    const carkaMapping = {
        'a': 'á',
        'e': 'é',
        'i': 'í',
        'o': 'ó',
        'u': 'ú',
        'y': 'ý',
        's': 'ś',
        'l': 'ľ'
    }

    // user pressed he wants "hacek" but then pressed key
    // that does not support "hacek"
    if (pluginState.nextWithHacek && hacekMapping[lWhichKey] === undefined) {
        setPluginState({
            nextWithHacek: false
        })
    }

    // user pressed he wants "carka" but then pressed key
    // that does not support "carka"
    if (pluginState.nextWithCarka && carkaMapping[lWhichKey] === undefined) {
        setPluginState({
            nextWithCarka: false
        })
    }

    // we expect next character with "hacek" and user supplied key that
    // supports it.
    if (pluginState.nextWithHacek && hacekMapping[lWhichKey] !== undefined) {
        setPluginState({
            nextWithHacek: false,
            toggle: false
        })
        whichKey = state.capsLockEnabled ? hacekMapping[lWhichKey].toUpperCase() : hacekMapping[lWhichKey];
    }

    // we expect next character with "carka" and user supplied key that
    // supports it.
    if (pluginState.nextWithCarka && carkaMapping[lWhichKey] !== undefined) {
        setPluginState({
            nextWithCarka: false,
            toggle: false
        })
        whichKey = state.capsLockEnabled ? carkaMapping[lWhichKey].toUpperCase() : carkaMapping[lWhichKey];
    }

    return whichKey
}

const settingsKey = {
    keyName: 'SETTINGS',
    fn: (pluginState, setPluginState) => {
        const isOpening = (pluginState) => {
            return pluginState.settingsShown === true || pluginState.settingsShown === undefined;
        }

        // do something with that information
        // console.log(isOpening(pluginState) ? 'opening' : 'closing', ' settings now...');
        alert(isOpening(pluginState) ? 'opening' : 'closing', ' settings now...');

        setPluginState({
            ...pluginState,
            settingsShown: pluginState.settingsShown === undefined ?
                false
                :
                !pluginState.settingsShown
        })
    }
}

const lastLine = ['PAGE', ',', 'SPACE', '.', 'HIDE', 'COLLAPSE', 'SWITCH', 'ENTER', settingsKey]


export const keyboardConfig = {
    // general settings
    layouts: {
        latin: {
            keys: {
                letterLines: [
                    [
                        'Q', 'W',
                        {keyName: 'E', alt: ['É', 'Ě']},
                        {keyName: 'R', alt: ['Ř']},
                        {keyName: 'T', alt: ['Ť']},
                        {keyName: 'Y', alt: ['Ý']},
                        {keyName: 'U', alt: ['Ů', 'Ú']},
                        {keyName: 'I', alt: ['Í']},
                        {keyName: 'O', alt: ['Ó']},
                        'P'
                    ],
                    [
                        {keyName: 'A', alt: ['Á', 'À']},
                        {keyName: 'S', alt: ['Š']},
                        {keyName: 'D', alt: ['Ď']},
                        'F', 'G', 'H', 'J', 'K', 'L',
                        {keyName: 'ˇ', fn: (pluginState, setPluginState) => hacekCarkaFeature(pluginState, setPluginState, 'ˇ')}
                    ],
                    [
                        'SHIFT',
                        {keyName: 'Z', alt: ['Ž']},
                        'X',
                        {keyName: 'C', alt: ['Č']},
                        'V', 'B',
                        {keyName: 'N', alt: ['Ň']},
                        'M',
                        {keyName: '´', fn: (pluginState, setPluginState) => hacekCarkaFeature(pluginState, setPluginState, '´')},
                        'BACKSPACE'
                    ],
                    lastLine
                ],
                space: 'Space'
            }
        },
        cyrillicPhonetic: {
            keys: {
                letterLines: [
                    ['Я', 'В', 'Е', 'Р', 'Т', 'У', 'И', {keyName: 'І', alt: ['Ї']}, 'О', 'П', 'Ш', 'Щ'],
                    ['А', 'С', 'Д', 'Ф', 'Г', 'Ч', 'Й', 'К', 'Л', 'Ж', 'Є'],
                    ['SHIFT', 'З', 'Х', 'Ц', 'Ж', 'Б', 'Н', 'М', 'Ю', 'Ґ', 'BACKSPACE'],
                    lastLine
                ],
                // mappings for QWERTY
                // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
                extraMapping: {
                    'BracketLeft': 'Ш',
                    'BracketRight': 'Щ',
                    'Backslash': 'Ґ',
                    'Semicolon': 'Ж',
                    'Quote': 'Є',
                    'Slash': '?',
                    'Period': 'Ґ',
                    'Comma': 'Ю',
                },
                space: 'Пробіл'
            }
        },
        cyrillic: {
            keys: {
                letterLines: [
                    ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ї', 'Ґ'],
                    ['Ф', 'І', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Є'],
                    ['SHIFT', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', 'BACKSPACE'],
                    lastLine
                ],
                extraMapping: {
                    'BracketLeft': 'Х',
                    'BracketRight': 'Ї',
                    'Backslash': 'Ґ',
                    'IntlBackslash': 'Ґ',
                    'Semicolon': 'Ж',
                    'Quote': 'Є',
                    'Period': 'Ю',
                    'Comma': 'Б',
                    'Slash': '?'
                },
                space: 'Пробіл'
            }
        }
    },
    pages: [
        {
            keys: {
                letterLines: [
                    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
                    ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
                    ['[', ']', '{', '}', ',', '.', '?', '!', '"', '\'', 'BACKSPACE'],
                    lastLine
                ]
            }
        },
        {
            keys: {
                letterLines: [
                    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
                    ['ě', 'š', 'č', 'ř', 'ž', 'ý', 'á', 'í', 'é', '='],
                    ['+', '-', '*', '/', '$', '€', '£', '¥', 'BACKSPACE'],
                    lastLine
                ]
            }
        }
    ],
    curLayoutOrder: ['latin', 'cyrillicPhonetic', 'cyrillic'],
    curLayoutIndex: 0,
    shown: false,
    transformers: [
        (state, pluginState, setPluginState, whichKey) => {
            return hacekCarkaTransformer(state, pluginState, setPluginState, whichKey)
        }
    ],

    // next-word prediction
    models: {
        cs: {
            unigramModelUrl: 'http://localhost:8080/model-1-gram-cs-processed.json',
            bigramModelUrl: 'http://localhost:8080/model-2-gram-cs-processed.json'
        },
        uk: {
            unigramModelUrl: 'http://localhost:8080/model-1-gram-uk-processed.json',
            bigramModelUrl: 'http://localhost:8080/model-2-gram-uk-processed.json'
        }
    },
    sourceLanguage: 'cs',
    targetId: 'targetInput',
}
