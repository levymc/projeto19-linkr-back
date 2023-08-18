import axios from 'axios'
import cheerio from 'cheerio'

export async function getMetadataFromUrl(req, res, next) {
    const url = req.body.postUrl
    try {
        const response = await axios.get('http://localhost:5000/get-metadata', {
        params: { url }
        });
        req.body.metadata = response.data.title || '';
        next()
    } catch (error) {
        console.error('Erro ao buscar a página:', error);
        return false;
    }
}

export async function getTitleFromUrl(req, res, next) {
    const url = req.body.postUrl
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const pageTitle = $('title').text();
        req.body.pageTitle = pageTitle
        next()
    } catch (error) {
        console.error('Erro ao buscar a página:', error);
        return false;
    }
}