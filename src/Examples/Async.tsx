import {Container, Heading, Text} from '@chakra-ui/layout'
import {Select} from '@chakra-ui/select'
import {atom, atomFamily, selector, selectorFamily, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import React, {Suspense, useState} from 'react'
import {getWeather} from './fakeAPI'
import {ErrorBoundary, FallbackProps} from 'react-error-boundary'
import {Button} from '@chakra-ui/react'

const userState = selectorFamily({
    key: 'user',
    get: (userId: number) => async () => {
        const userData = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then((res) => res.json())
        if(userId === 4) throw new Error('User does not exist')
        return userData
    },
})

const weatherState = selectorFamily({
    key: 'weather',
    get: (userId: number) => async ({get}) => {
        get(weatherRequestIdState(userId))

        const user = await get(userState(userId))
        const weather = getWeather(user.address.city)
        return weather
    },
})

const weatherRequestIdState = atomFamily({
    key: 'weatherRequestId',
    default: 0,
})

const useRefetchWeather = (userId: number) => {
    const setRequestId = useSetRecoilState(weatherRequestIdState(userId))
    return () => {
        setRequestId(id => id + 1)
    }
}

const UserWeather = ({userId}: {userId: number}) => {
    const user = useRecoilValue(userState(userId))
    const weather = useRecoilValue(weatherState(userId))
    const refetch = useRefetchWeather(userId)

    return (
        <div>
            <Text>
                <b>Weather for {user.address.city}:</b> {weather}ºC
            </Text>
            <Text onClick={refetch}>(refresh weather)</Text>
        </div>
    )
}

const UserData = ({userId}: {userId: number}) => {
    const user = useRecoilValue(userState(userId))


    if (!user) return null

    return (
        <div>
            <Heading as='h2' size='md' mb={1}>
                User data:
            </Heading>
            <Text>
                <b>Name:</b> {user.name}
            </Text>
            <Text>
                <b>Phone:</b> {user.phone}
            </Text>
            <Suspense fallback={<p>Loading...</p>}>
                <UserWeather userId={userId} />
            </Suspense>
        </div>
    )
}

const ErrorFallBack = ({error, resetErrorBoundary}: FallbackProps) => {
    return (
        <div>
            <Heading as='h2' size='md' mb={1}>
                Something went wrong
            </Heading>
            <Text>
                {error.message}
            </Text>
            <Button onClick={resetErrorBoundary}>Ok</Button>
        </div>
    )
}

export const Async = () => {
    const [userId, setUserId] = useState<number | undefined>(undefined)

    return (
        <Container py={10}>
            <Heading as='h1' mb={4}>
                View Profile
            </Heading>
            <Heading as='h2' size='md' mb={1}>
                Choose a user:
            </Heading>
            <Select
                placeholder='Choose a user'
                mb={4}
                value={userId}
                onChange={(event) => {
                    const value = event.target.value
                    setUserId(value ? parseInt(value) : undefined)
                }}
            >
                <option value='1'>User 1</option>
                <option value='2'>User 2</option>
                <option value='3'>User 3</option>
                <option value='4'>User 4</option>
            </Select>
            {userId !== undefined &&
                <ErrorBoundary
                    FallbackComponent={ErrorFallBack}
                    onReset={() => setUserId(undefined)}
                    resetKeys={[userId]}
                >
                    <Suspense fallback={<div>Loading...</div>}>
                        <UserData userId={userId} />
                    </Suspense>
                </ErrorBoundary>
            }
        </Container>
    )
}
