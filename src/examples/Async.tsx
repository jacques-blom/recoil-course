import {Button} from '@chakra-ui/button'
import {Container, Heading, Text} from '@chakra-ui/layout'
import {Select} from '@chakra-ui/select'
import {Suspense, useState} from 'react'
import {ErrorBoundary, FallbackProps} from 'react-error-boundary'
import {atomFamily, selectorFamily, useRecoilValue, useSetRecoilState} from 'recoil'
import {getWeather} from './fakeAPI'

const userState = selectorFamily({
    key: 'user',
    get: (userId: number) => async () => {
        const userData = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then((res) => res.json())
        if (userId === 4) throw new Error('User does not exist')
        return userData
    },
})

const UserData = ({userId}: {userId: number}) => {
    const user = useRecoilValue(userState(userId))
    if (!user) return null

    return (
        <div>
            <Heading as="h2" size="md" mb={1}>
                User data:
            </Heading>
            <Text>
                <b>Name:</b> {user.name}
            </Text>
            <Text>
                <b>Phone:</b> {user.phone}
            </Text>
            <Suspense fallback={<div>Loading weather...</div>}>
                <UserWeather userId={userId} />
            </Suspense>
        </div>
    )
}

const weatherFetchIdState = atomFamily({
    key: 'weatherFetchId',
    default: 0,
})

const useRefreshWeather = (userId: number) => {
    const setFetchId = useSetRecoilState(weatherFetchIdState(userId))
    return () => setFetchId((id) => id + 1)
}

const weatherState = selectorFamily({
    key: 'weather',
    get: (userId: number) => async ({get}) => {
        get(weatherFetchIdState(userId))

        const user = get(userState(userId))
        const weather = await getWeather(user.address.city)
        return weather
    },
})

const UserWeather = ({userId}: {userId: number}) => {
    const user = useRecoilValue(userState(userId))
    const weather = useRecoilValue(weatherState(userId))
    const refresh = useRefreshWeather(userId)

    return (
        <div>
            <Text>
                <b>Weather in {user.address.city}:</b> {weather}ºC
            </Text>
            <Text onClick={refresh}>(refresh weather)</Text>
        </div>
    )
}

const ErrorFallback = ({error, resetErrorBoundary}: FallbackProps) => {
    return (
        <div>
            <Heading as="h2" size="md" mb={1}>
                Something went wrong
            </Heading>
            <Text mb={1}>{error.message}</Text>
            <Button onClick={resetErrorBoundary}>Ok</Button>
        </div>
    )
}

export const Async = () => {
    const [userId, setUserId] = useState<undefined | number>(undefined)

    console.log('userId', userId)

    return (
        <Container py={10}>
            <Heading as="h1" mb={4}>
                View Profile
            </Heading>
            <Heading as="h2" size="md" mb={1}>
                Choose a user:
            </Heading>
            <Select
                placeholder="Choose a user"
                mb={4}
                value={userId}
                onChange={(event) => {
                    const value = event.target.value
                    setUserId(value ? parseInt(value) : undefined)
                }}
            >
                <option value="1">User 1</option>
                <option value="2">User 2</option>
                <option value="3">User 3</option>
                <option value="4">User 4 (Throws)</option>
            </Select>
            <ErrorBoundary
                FallbackComponent={ErrorFallback}
                resetKeys={[userId]}
                onReset={() => {
                    setUserId(undefined)
                }}
            >
                {userId !== undefined && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <UserData userId={userId} />
                    </Suspense>
                )}
            </ErrorBoundary>
        </Container>
    )
}
