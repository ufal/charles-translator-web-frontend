const MAX_HISTORY_COUNT = 100;

export function getHistory() {
	if (typeof window === "undefined")
		return [];

	const historyJson = localStorage.getItem("translationHistory");

	if (historyJson == null)
		return [];

	try {
		return JSON.parse(historyJson);
	} catch (e) {
		return [];
	}
}

export function saveHistory(fromLanguageId, toLanguageId, text) {
	if (text === "")
		return;

	const historyItem = {
		fromLanguageId,
		toLanguageId,
		text,
		star: false,
	}

	let originalHistory = getHistory();
	let foundDuplicate = originalHistory.findIndex((item) => item.text === text) !== -1;

	if(foundDuplicate){
		originalHistory.sort((a,b) => a.text === text ? -1 : b.text === text ? 1 : 0);
	} else {
		originalHistory.unshift(historyItem);
	}

	localStorage.setItem("translationHistory", JSON.stringify(originalHistory.slice(0, MAX_HISTORY_COUNT)));
}

export function removeItemFromHistory(index){
	localStorage.removeItem(index);
}

export function changeStarInHistory(value, star){
	let originalHistory = getHistory();
	originalHistory.find((item) => item.text === value.text && item.fromLanguageId === value.fromLanguageId && item.toLanguageId === value.toLanguageId).star = star;
	localStorage.setItem("translationHistory", JSON.stringify(originalHistory));
}
