import axios from 'axios';

const baseApiUrl = 'https://lindat.cz/translation/api/v2/languages';

const headers = {
    accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
}

export function translate({text, fromLanguage, toLanguage}) {
    const data = new FormData();
    data.append('input_text', text);

    // return axios({
    //     method: 'get',
    //     url: `${baseApiUrl}`,
    // });

    return axios({
        method: 'POST',
        url: `${baseApiUrl}/?src=${encodeURIComponent(fromLanguage)}&tgt=${encodeURIComponent(toLanguage)}`,
        data,
        headers
    });
}
