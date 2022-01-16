export const getPodcastData = async (token, page=1) => {
    console.log('PODAPI:GETPODCASTDATA:', page)
    const response = await fetch('https://example.com/wp-json/wp/v2/podcast/?page='+page,
    {
        headers: {
            accessToken: token
        }
    })
    const podcastsData = await response.json();
    return podcastsData
}