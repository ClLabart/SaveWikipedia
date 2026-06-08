import cassandra from 'cassandra-driver';

// get links of the articles from downloader_urls.js and register them in the database if they don't exist
function indexUrls(links) {
    // Replace 'Username' and 'Password' with the username and password from your cluster settings
    let authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra', 'admin');
    // Replace the PublicIPs with the IP addresses of your clusters
    let contactPoints = ['127.0.0.1:9042'];
    
    let client = new cassandra.Client({contactPoints: contactPoints, authProvider: authProvider, localDataCenter: 'datacenter1', keyspace:'articles'});
    
    // let query = 'SELECT * FROM articles.wiki;';
    // let q1 = client.execute(query).then(result => {console.log('is ' + result.rows[0].url);}).catch((err) => {console.log('ERROR :', err);});
    
    // Define and execute the queries
    const query = 'INSERT INTO articles.wiki (indexletters, url, isStored) VALUES (?, ?, false);'
    let queries = []
    links.map((link) => {
        queries.push(client.execute(query, [link.slice(0,2) , link]).then(result => {}).catch((err) => {console.log('ERROR : ', err);}));
    })

    // Exit the program after all queries are complete
    return Promise.allSettled(queries).catch(err => console.log(err)).finally(() => client.shutdown());    
}

export { indexUrls };