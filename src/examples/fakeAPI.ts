export const getWeather = (zipCode: string) => {
    return new Promise<number>((resolve) => {
        setTimeout(() => {
            if (!getWeatherCache[zipCode]) {
                getWeatherCache[zipCode] = randomIntBetween(5, 35)
            } else {
                getWeatherCache[zipCode] += randomIntBetween(-1, 2)
            }

            resolve(getWeatherCache[zipCode])
        }, randomIntBetween(500, 3000))
    })
}

const getWeatherCache: Record<string, number> = {}

function randomIntBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
