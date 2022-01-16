export const getRadioData = async () => {
    const response = await fetch('https://aftermath.media/wp-json/wp/v2/podcast/')
    const radiocoData = await response.json();
    return radiocoData
}