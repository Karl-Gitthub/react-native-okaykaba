import { useSignIn } from '@clerk/expo'
import { Ionicons } from '@expo/vector-icons'
import clsx from 'clsx'
import { Link, useRouter } from 'expo-router'
import { styled } from 'nativewind'
import React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context'

const SafeAreaView = styled(RNSafeAreaView)

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FieldErrors = {
  email?: string
  password?: string
}

const SignIn = () => {
  const { signIn, fetchStatus } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({})
  const [formError, setFormError] = React.useState<string | null>(null)

  const isSubmitting = fetchStatus === 'fetching'

  const validate = () => {
    const nextErrors: FieldErrors = {}

    if (!emailAddress.trim()) {
      nextErrors.email = 'Enter your email address'
    } else if (!EMAIL_REGEX.test(emailAddress.trim())) {
      nextErrors.email = 'Enter a valid email address'
    }

    if (!password) {
      nextErrors.password = 'Enter your password'
    }

    setFieldErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async () => {
    setFormError(null)
    if (!validate()) return

    const { error } = await signIn.password({
      emailAddress: emailAddress.trim(),
      password,
    })

    if (error) {
      setFormError('Incorrect email or password. Please try again.')
      return
    }

    if (signIn.status === 'complete') {
      await signIn.finalize({
        navigate: () => router.replace('/(tabs)'),
      })
    } else {
      setFormError('We could not sign you in. Please try again.')
    }
  }

  return (
    <SafeAreaView className="auth-safe-area" edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="auth-screen"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          className="auth-scroll"
          contentContainerClassName="auth-content"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="auth-brand-block">
            <View className="auth-logo-wrap">
              <View className="auth-logo-mark">
                <Text className="auth-logo-mark-text">K</Text>
              </View>
              <View>
                <Text className="auth-wordmark">OkayKaba</Text>
                <Text className="auth-wordmark-sub">Subscription Tracker</Text>
              </View>
            </View>
            <Text className="auth-title">Welcome back</Text>
            <Text className="auth-subtitle">
              Sign in to keep track of everything you pay for.
            </Text>
          </View>

          <View className="auth-card">
            <View className="auth-form">
              <View className="auth-field">
                <Text className="auth-label">Email</Text>
                <TextInput
                  className={clsx('auth-input', fieldErrors.email && 'auth-input-error')}
                  value={emailAddress}
                  placeholder="you@example.com"
                  placeholderTextColor="rgba(8, 17, 38, 0.4)"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  editable={!isSubmitting}
                  onChangeText={(value) => {
                    setEmailAddress(value)
                    if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }))
                  }}
                />
                {fieldErrors.email && <Text className="auth-error">{fieldErrors.email}</Text>}
              </View>

              <View className="auth-field">
                <Text className="auth-label">Password</Text>
                <View className="relative justify-center">
                  <TextInput
                    className={clsx(
                      'auth-input',
                      'pr-12',
                      fieldErrors.password && 'auth-input-error',
                    )}
                    value={password}
                    placeholder="Enter your password"
                    placeholderTextColor="rgba(8, 17, 38, 0.4)"
                    secureTextEntry={!showPassword}
                    autoComplete="password"
                    textContentType="password"
                    editable={!isSubmitting}
                    onChangeText={(value) => {
                      setPassword(value)
                      if (fieldErrors.password) {
                        setFieldErrors((prev) => ({ ...prev, password: undefined }))
                      }
                    }}
                  />
                  <Pressable
                    className="absolute right-4"
                    onPress={() => setShowPassword((prev) => !prev)}
                    hitSlop={8}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="rgba(8, 17, 38, 0.6)"
                    />
                  </Pressable>
                </View>
                {fieldErrors.password && (
                  <Text className="auth-error">{fieldErrors.password}</Text>
                )}
              </View>

              {formError && <Text className="auth-error">{formError}</Text>}

              <Pressable
                className={clsx('auth-button', isSubmitting && 'auth-button-disabled')}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                <Text className="auth-button-text">
                  {isSubmitting ? 'Signing in…' : 'Sign In'}
                </Text>
              </Pressable>
            </View>

            <View className="auth-link-row">
              <Text className="auth-link-copy">New to OkayKaba?</Text>
              <Link href="/(auth)/sign-up" className="auth-link">
                Create an account
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignIn
