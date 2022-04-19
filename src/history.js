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
	let foundDuplicate = originalHistory.findIndex(
		(item) => text.length >= item.text.length && text.substr(0,item.text.length) === item.text
	);

	if(foundDuplicate !== -1){
		originalHistory.sort((a,b) => a.text === text ? -1 : b.text === text ? 1 : 0);
		originalHistory[0].text = text;
	} else {
		originalHistory.unshift(historyItem);
	}

	localStorage.setItem("translationHistory", JSON.stringify(originalHistory.slice(0, MAX_HISTORY_COUNT)));
}

export function removeItemFromHistory(value){
	let originalHistory = getHistory();
	originalHistory = originalHistory.filter((item) => item.text !== value.text || item.fromLanguageId !== value.fromLanguageId || item.toLanguageId !== value.toLanguageId);
	localStorage.setItem("translationHistory", JSON.stringify(originalHistory));
}

export function changeStarInHistory(value, star){
	let originalHistory = getHistory();
	originalHistory.find((item) => item.text === value.text && item.fromLanguageId === value.fromLanguageId && item.toLanguageId === value.toLanguageId).star = star;
	localStorage.setItem("translationHistory", JSON.stringify(originalHistory));
}
