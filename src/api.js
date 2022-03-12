import axios from "axios";

const baseApiUrl = "https://lindat.cz/translation/api/v2/languages";

const headers = {
  accept: "application/json",
  "Content-Type": "application/x-www-form-urlencoded",
};
const dataAppend = (data) => {
  data.append("input_text", text);
  data.append("logInput", localStorage.getItem("collectDataConsentValue"));
};
export function translate({ text, fromLanguage, toLanguage }) {
  const data = new FormData();
  dataAppend(data);
  return axios({
    method: "POST",
    url: `${baseApiUrl}/?src=${encodeURIComponent(
      fromLanguage
    )}&tgt=${encodeURIComponent(toLanguage)}`,
    data,
    headers,
  });
}
