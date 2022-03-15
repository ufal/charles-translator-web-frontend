import axios from "axios";

const baseApiUrl = "https://lindat.cz/translation/api/v2/languages";

const headers = {
  accept: "application/json",
  "Content-Type": "application/x-www-form-urlencoded",
};

function getConsent() {
  return localStorage.getItem("collectDataConsentValue") === "true"
    ? "true"
    : "false";
}

export function setAuthor(author) {
  return localStorage.setItem("author", author);
}

function getAuthor() {
  return localStorage.getItem("author");
}

export function translate({ text, fromLanguage, toLanguage, loadingID }) {
  if(text.length === 0)
    return Promise.resolve({ data: "", loadingID });

  const data = new URLSearchParams();
  data.append("input_text", text.normalize('NFC'));
  data.append("logInput", getConsent());
  data.append("author", getAuthor());

  return axios({
    method: "POST",
    url: `${baseApiUrl}/?src=${encodeURIComponent(
      fromLanguage
    )}&tgt=${encodeURIComponent(toLanguage)}`,
    data,
    headers,
  }).then((response) => {return { data: response.data.join(" "), loadingID }});
}
