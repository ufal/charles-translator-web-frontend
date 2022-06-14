const headers = {
	accept: "application/json",
	'Content-Type': 'application/x-www-form-urlencoded'
};

function getConsent() {
	return localStorage.getItem("collectDataConsentValue") === "true"
		? "true"
		: "false";
}

function getAuthor() {
	return localStorage.getItem("organizationName") || "";
}

export function translate({ text, fromLanguage, toLanguage, loadingID, inputType }) {
	if(text.length === 0)
		return Promise.resolve({ data: "", loadingID });
		
	if(text.length > 5000)
		return Promise.reject({ data: "The translation is too long", loadingID });


	const baseApiUrl = "https://translator.cuni.cz/api/v2/languages";
	const url = `${baseApiUrl}/?src=${encodeURIComponent(fromLanguage)}&tgt=${encodeURIComponent(toLanguage)}&frontend=u4u`;

	const formData = {
		input_text: text.normalize('NFC'),
		logInput: getConsent(),
		inputType,
		author: getAuthor(),
	}

	const formBody = [];
	for (let property in formData) {
		const encodedKey = encodeURIComponent(property)
		const encodedValue = encodeURIComponent(formData[property])
		formBody.push(encodedKey + "=" + encodedValue)
	}
	
	return fetch(url, {
		method: 'POST',
		body: formBody.join("&"),
		headers,
	})
	.then(response => {
		switch(response.status){
			case 413: throw { data: "The translation is too long" };
			case 504: throw { data: "The translation took too long" };
			default: return response.json(); 
		}
	})
	.then(response => { return { data: response.join(" "), loadingID } })
}