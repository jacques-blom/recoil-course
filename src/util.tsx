import {apiUrl} from './api'

export const getBorderColor = (visible: boolean) => {
    return visible ? '#CCC' : 'transparent'
}

/**
 * Returns the width and height for the specified image.
 */
export const getImageDimensions = (src: string) => {
    return new Promise<{width: number; height: number}>((resolve, reject) => {
        const image = new Image()
        image.onload = () => {
            resolve({width: image.width, height: image.height})
        }
        image.onerror = (error) => {
            reject(error)
        }
        image.src = src
    })
}

/**
 * A function that returns a random image URL and that image's
 * id, which can be used to refer back to that image in API requests.
 */
export const getRandomImage = () => {
    const id = Date.now()
    return {src: apiUrl('random-image', {seed: id}), id}
}
