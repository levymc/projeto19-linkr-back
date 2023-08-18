import urlMetadata from "url-metadata"

export async function getMetadataFromUrl(req, res, next) {
    const url = req.body.postUrl
    if (!url) {
        return res.status(400).json({ error: 'URL not provided' });
    }

    try {
        const metadata = await urlMetadata(url);
        req.body.metadata = metadata
        console.log("Achou o metadata")
        next()
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching metadata' });
    }
}
