const randomDelay = () => {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, randomIntBetween(500, 3000))
    })
}

export const getWeather = async (zipCode: string) => {
    await randomDelay()

    if (!getWeatherCache[zipCode]) {
        getWeatherCache[zipCode] = randomIntBetween(5, 35)
    } else {
        getWeatherCache[zipCode] += randomIntBetween(-1, 2)
    }

    return getWeatherCache[zipCode]
}

const getWeatherCache: Record<string, number> = {}

function randomIntBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

type ItemType = {
    label: string
    checked: boolean
}

class ShoppingListAPI {
    items: Record<number, ItemType>

    constructor() {
        const persisted = localStorage.getItem('ShoppingListAPI')
        if (persisted == null) {
            this.items = {}
        } else {
            this.items = JSON.parse(persisted)
        }
    }

    async getItems() {
        console.log('Fake API Request: getItems')
        await randomDelay()
        return this.items
    }

    async getItem(id: number): Promise<ItemType | undefined> {
        console.log('Fake API Request: getItem')
        await randomDelay()
        return this.items[id]
    }

    async createOrUpdateItem(id: number, item: ItemType) {
        console.log('Fake API Request: createOrUpdateItem')
        await randomDelay()
        this.items[id] = item
        this.persist()
    }

    async deleteItem(id: number) {
        console.log('Fake API Request: deleteItem')
        await randomDelay()
        delete this.items[id]
        this.persist()
    }

    private persist() {
        localStorage.setItem('ShoppingListAPI', JSON.stringify(this.items))
    }
}

export const shoppingListAPI = new ShoppingListAPI()
