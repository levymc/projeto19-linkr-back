import axios from 'axios'
import cheerio from 'cheerio'

async function getMetadataFromUrl(url) {
    try {
        const response = await axios.get('http://localhost:5000/get-metadata', {
        params: { url }
        });
        const pageTitle = response.data.title || '';
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar a página:', error);
        return false;
    }
}

async function getTitleFromUrl(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const pageTitle = $('title').text();
        return pageTitle;
    } catch (error) {
        console.error('Erro ao buscar a página:', error);
        return false;
    }
}

const urlToExtractTitleFrom = 'https://wehandle.com.br/';
getTitleFromUrl(urlToExtractTitleFrom)
  .then(title => {
    if (title !== false) {
      console.log('Título da página:', title);
    } else {
      console.log('Ocorreu um erro ao buscar o título da página.');
    }
  })
  .catch(error => {
    console.error('Erro ao usar a função:', error);
  });