const {JSDOM} = require('jsdom')

async function crawlPage(currentURL) {
    console.log(`crawling ${currentURL}`)

    try{
        const resp = await fetch(currentURL);

        if (resp.status > 399){
            console.log(`error in fetch with code ${resp.status} on page ${currentURL}`)
            return;
        }
const contentType = resp.headers.get("content-type")
if (!contentType.includes("text/html")){
    console.log(`non html response, content type: ${contentType} on page ${currentURL}`)
            return;
}

        console.log(await resp.text())
    } catch(err){
        console.log(`error in fetch: ${err.message} on page ${currentURL}`)
    }

  

}



function getURLSfromHTML(htmlBody,baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkelements = dom.window.document.querySelectorAll('a')
    for (const linkelement of linkelements) {
        


        if(linkelement.href.slice(0,1)==='/'){
            try{
                const urlOBJ = new URL(baseURL+linkelement.href)
                urls.push(baseURL+linkelement.href)
            }
            catch(err){
                console.log(`bad url:${linkelement.href},\n ${err.message}`)
            }


            
        }else{
            try{
                const urlOBJ = new URL(linkelement.href)
                urls.push(linkelement.href)
            }
            catch(err){
                console.log(`bad url:${linkelement.href},\n ${err.message}`)
            }


    }
}
    return urls;
}



function normalizeURL(urlString){
    const urlOBJ = new URL(urlString);
    const hostpath = `${urlOBJ.hostname}${urlOBJ.pathname}`;
    if (hostpath.length > 0 && hostpath.slice(-1)==='/'){
        return hostpath.slice(0,-1);
    }

    return hostpath;
}

module.exports = {

    normalizeURL,
    getURLSfromHTML,
    crawlPage
}