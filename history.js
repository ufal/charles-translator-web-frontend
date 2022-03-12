const maxHistory = 100;

export function getHistory(language) {
    const historyJson = localStorage.getItem(`history-${language}`);

    if (historyJson == null) {
        return []
    }

    try {
        return JSON.parse(historyJson)
    } catch (e) {
        return []
    }
}

export function saveHistory(language, text) {
    const originalHistory = getHistory(language)
    const history = [text, ...originalHistory.filter(item => item !== text)];
    const limitedHistory = history.slice(0, maxHistory);

    localStorage.setItem(`history-${language}`, JSON.stringify(limitedHistory))
}
