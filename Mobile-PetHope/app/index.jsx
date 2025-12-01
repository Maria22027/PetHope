import { Redirect } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { getToken } from './utils/api'

export default function Index() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken()
        console.log('Token check - Has token:', !!token)
        setIsSignedIn(!!token)
      } catch (error) {
        console.error('Auth check error:', error)
        setIsSignedIn(false)
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (isSignedIn) {
    return <Redirect href="/(tabs)" />
  }

  return <Redirect href="/(auth)/signIn" />
}
