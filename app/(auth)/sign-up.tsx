import { icons } from '@/constants/icons'
import { useSignUp } from '@clerk/expo'
import { Ionicons } from '@expo/vector-icons'
import clsx from 'clsx'
import { Link, useRouter } from 'expo-router'
import { styled } from 'nativewind'
import React from 'react'
import {
  Image,
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
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/

type FieldErrors = {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
}

const SignUp = () => {
  const { signUp, fetchStatus } = useSignUp()
  const router = useRouter()

  const [username, setUsername] = React.useState('')
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({})
  const [formError, setFormError] = React.useState<string | null>(null)

  const [emailSent, setEmailSent] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [codeError, setCodeError] = React.useState<string | null>(null)
  const [resendCooldown, setResendCooldown] = React.useState(false)

  const isSubmitting = fetchStatus === 'fetching'

  const validate = () => {
    const nextErrors: FieldErrors = {}

    if (!username.trim()) {
      nextErrors.username = 'Choose a username'
    } else if (username.trim().length < 4) {
      nextErrors.username = 'Username must be at least 4 characters'
    } else if (!USERNAME_REGEX.test(username.trim())) {
      nextErrors.username = 'Only letters, numbers, and underscores'
    }

    if (!emailAddress.trim()) {
      nextErrors.email = 'Enter your email address'
    } else if (!EMAIL_REGEX.test(emailAddress.trim())) {
      nextErrors.email = 'Enter a valid email address'
    }

    if (!password) {
      nextErrors.password = 'Create a password'
    } else if (password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters'
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password'
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'Passwords do not match'
    }

    setFieldErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleCreateAccount = async () => {
    setFormError(null)
    if (!validate()) return

    const { error } = await signUp.password({
      emailAddress: emailAddress.trim(),
      username: username.trim(),
      password,
    })

    if (error) {
      setFormError(
        error.longMessage ?? 'We could not create your account. Please try again.',
      )
      return
    }

    const { error: codeSendError } = await signUp.verifications.sendEmailCode()
    if (codeSendError) {
      setFormError(
        codeSendError.longMessage ??
          'We could not send a verification code. Please try again.',
      )
      return
    }

    setEmailSent(true)
  }

  const handleVerify = async () => {
    setCodeError(null)

    if (code.trim().length !== 6) {
      setCodeError('Enter the 6-digit code')
      return
    }

    const { error } = await signUp.verifications.verifyEmailCode({ code: code.trim() })

    if (error) {
      setCodeError(error.longMessage ?? error.message ?? 'That code is incorrect or has expired.')
      return
    }

    if (signUp.status === 'complete') {
      await signUp.finalize({
        navigate: () => router.replace('/(tabs)'),
      })
    } else {
      setCodeError('We could not complete your sign-up. Please try again.')
    }
  }

  const handleResend = async () => {
    if (resendCooldown) return
    setCodeError(null)
    setResendCooldown(true)
    await signUp.verifications.sendEmailCode()
    setTimeout(() => setResendCooldown(false), 15000)
  }

  if (emailSent) {
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
            <Pressable
              className="mb-4 size-10 items-center justify-center"
              onPress={() => {
                setEmailSent(false)
                setCode('')
                setCodeError(null)
              }}
              hitSlop={8}
            >
              <Image source={icons.back} className="size-6" resizeMode="contain" />
            </Pressable>

            <View className="auth-brand-block">
              <Text className="auth-title">Check your email</Text>
              <Text className="auth-subtitle">
                Enter the 6-digit code we sent to {emailAddress.trim()}
              </Text>
            </View>

            <View className="auth-card">
              <View className="auth-form">
                <View className="auth-otp-field">
                  <TextInput
                    className={clsx('auth-otp-input', codeError && 'auth-otp-input-error')}
                    value={code}
                    onChangeText={(value) => {
                      setCode(value.replace(/[^0-9]/g, '').slice(0, 6))
                      if (codeError) setCodeError(null)
                    }}
                    placeholder="------"
                    placeholderTextColor="rgba(8, 17, 38, 0.3)"
                    keyboardType="number-pad"
                    maxLength={6}
                    textContentType="oneTimeCode"
                    editable={!isSubmitting}
                  />
                  {codeError && <Text className="auth-error">{codeError}</Text>}
                </View>

                <Pressable
                  className={clsx('auth-button', isSubmitting && 'auth-button-disabled')}
                  onPress={handleVerify}
                  disabled={isSubmitting}
                >
                  <Text className="auth-button-text">
                    {isSubmitting ? 'Verifying…' : 'Verify Email'}
                  </Text>
                </Pressable>
              </View>

              <View className="auth-resend-row">
                <Text className="auth-helper">Didn't get a code?</Text>
                <Pressable onPress={handleResend} disabled={resendCooldown}>
                  <Text className="auth-link">
                    {resendCooldown ? 'Sent' : 'Resend'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
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
            <Text className="auth-title">Create your account</Text>
            <Text className="auth-subtitle">
              Start tracking your subscriptions in seconds.
            </Text>
          </View>

          <View className="auth-card">
            <View className="auth-form">
              <View className="auth-field">
                <Text className="auth-label">Username</Text>
                <TextInput
                  className={clsx('auth-input', fieldErrors.username && 'auth-input-error')}
                  value={username}
                  placeholder="yourusername"
                  placeholderTextColor="rgba(8, 17, 38, 0.4)"
                  autoCapitalize="none"
                  autoComplete="username"
                  textContentType="username"
                  editable={!isSubmitting}
                  onChangeText={(value) => {
                    setUsername(value)
                    if (fieldErrors.username) {
                      setFieldErrors((prev) => ({ ...prev, username: undefined }))
                    }
                  }}
                />
                {fieldErrors.username && (
                  <Text className="auth-error">{fieldErrors.username}</Text>
                )}
              </View>

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
                    placeholder="At least 8 characters"
                    placeholderTextColor="rgba(8, 17, 38, 0.4)"
                    secureTextEntry={!showPassword}
                    autoComplete="password-new"
                    textContentType="newPassword"
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

              <View className="auth-field">
                <Text className="auth-label">Confirm password</Text>
                <View className="relative justify-center">
                  <TextInput
                    className={clsx(
                      'auth-input',
                      'pr-12',
                      fieldErrors.confirmPassword && 'auth-input-error',
                    )}
                    value={confirmPassword}
                    placeholder="Re-enter your password"
                    placeholderTextColor="rgba(8, 17, 38, 0.4)"
                    secureTextEntry={!showConfirmPassword}
                    autoComplete="password-new"
                    textContentType="newPassword"
                    editable={!isSubmitting}
                    onChangeText={(value) => {
                      setConfirmPassword(value)
                      if (fieldErrors.confirmPassword) {
                        setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }))
                      }
                    }}
                  />
                  <Pressable
                    className="absolute right-4"
                    onPress={() => setShowConfirmPassword((prev) => !prev)}
                    hitSlop={8}
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="rgba(8, 17, 38, 0.6)"
                    />
                  </Pressable>
                </View>
                {fieldErrors.confirmPassword && (
                  <Text className="auth-error">{fieldErrors.confirmPassword}</Text>
                )}
              </View>

              {formError && <Text className="auth-error">{formError}</Text>}

              <Pressable
                className={clsx('auth-button', isSubmitting && 'auth-button-disabled')}
                onPress={handleCreateAccount}
                disabled={isSubmitting}
              >
                <Text className="auth-button-text">
                  {isSubmitting ? 'Creating account…' : 'Create Account'}
                </Text>
              </Pressable>
            </View>

            <View className="auth-link-row">
              <Text className="auth-link-copy">Already have an account?</Text>
              <Link href="/(auth)/sign-in" className="auth-link">
                Sign in
              </Link>
            </View>

            {/* Required for sign-up flows — Clerk's bot sign-up protection */}
            <View nativeID="clerk-captcha" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUp
