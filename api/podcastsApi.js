export const getPodcastData = async (token) => {
    console.log('Token: ', token)
    const response = await fetch('https://aftermath.media/wp-json/wp/v2/podcast/',
    {
        headers: {
            accessToken: token
        }
    })
    const podcastsData = await response.json();
    return podcastsData
}