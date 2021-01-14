import {fileOpen, fileSave} from 'browser-nativefs'
import {createNanoEvents, Emitter} from 'nanoevents'
import {AtomEffect, DefaultValue} from 'recoil'

type State = {
    type: 'redraw'
    state: Record<string, any>
}

type Events = {
    rehydrate: (state: Record<string, any>) => void
}

class FileStorage {
    state: Record<string, any> = {}
    emitter: Emitter

    constructor() {
        this.emitter = createNanoEvents<Events>()
        console.log('constructoe', this.emitter)
    }

    on<E extends keyof Events>(event: E, callback: Events[E]) {
        return this.emitter.on(event, callback)
    }

    async openFile() {
        const blob = await fileOpen({
            description: 'Redraw files',
            extensions: ['.redraw'],
            mimeTypes: ['application/json'],
        })

        let contents = ''
        if ('text' in Blob) {
            contents = await blob.text()
        } else {
            contents = await new Promise((resolve) => {
                const reader = new FileReader()
                reader.readAsText(blob, 'utf8')
                reader.onloadend = () => {
                    if (reader.readyState === FileReader.DONE) {
                        resolve(reader.result as string)
                    }
                }
            })
        }

        const parsedContents: State = JSON.parse(contents)

        this.state = parsedContents.state

        this.emitter.emit('rehydrate', parsedContents.state)
    }

    async saveFile() {
        const fileContents = {
            type: 'redraw',
            state: this.state,
        }

        const json = JSON.stringify(fileContents, null, 4)
        const blob = new Blob([json], {type: 'application/json'})

        await fileSave(blob, {
            description: 'Redraw drawing',
            extensions: ['.redraw'],
        })
    }

    getValue(key: string) {
        return this.state[key]
    }

    setValue(key: string, value: any) {
        this.state[key] = value
    }

    deleteValue(key: string) {
        delete this.state[key]
    }
}

export const filePersist = new FileStorage()

export function persist<T>({onSet, node: {key}, setSelf, resetSelf, trigger}: Parameters<AtomEffect<T>>[0]) {
    if (trigger === 'get') {
        const persistedValue = filePersist.getValue(key)
        if (persistedValue != null) setSelf(persistedValue)
    }

    filePersist.on('rehydrate', (state) => {
        if (state[key]) {
            setSelf(state[key])
        } else {
            resetSelf()
        }
    })

    onSet((newValue) => {
        if (newValue instanceof DefaultValue) {
            filePersist.deleteValue(key)
        } else {
            filePersist.setValue(key, newValue)
        }
    })
}
