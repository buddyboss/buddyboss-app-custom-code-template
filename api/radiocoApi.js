export const getRadioData = async () => {
    const response = await fetch('https://radio.co.api.insert')
    const radiocoData = await response.json();
    return radiocoData
}