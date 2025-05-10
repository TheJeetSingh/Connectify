import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import TreesIcon from '../assets/trees';
import * as api from '../utils/api';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);

    try {
      const response = await api.loginUser({ email, password });
      
      if (response.success) {
        // If login is successful, navigate to the home screen
        router.replace('/(tabs)');
      } else {
        Alert.alert('Login Failed', response.message || 'Something went wrong');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <TreesIcon size={80} color="white" />
          <Text style={styles.logoText}>connectify</Text>
        </View>
        <View style={styles.bubbleSmall1} />
        <View style={styles.bubbleMedium} />
        <View style={styles.bubbleSmall2} />
      </View>
      
      <Text style={styles.title}>Get Started Now!</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />
        
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            editable={!loading}
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            disabled={loading}
          >
            <Ionicons 
              name={secureTextEntry ? 'eye-off' : 'eye'} 
              size={24} 
              color="#999" 
            />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity disabled={loading}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Text style={styles.loginButtonText}>Login</Text>
              <Ionicons name="arrow-forward" size={22} color="white" style={styles.arrowIcon} />
            </>
          )}
        </TouchableOpacity>
        
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Not a member?</Text>
          <TouchableOpacity onPress={() => router.push('/register')} disabled={loading}>
            <Text style={styles.registerLink}> Register now</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.socialContainer}>
          <TouchableOpacity style={[styles.socialButton, styles.googleButton]} disabled={loading}>
            <Text style={styles.socialButtonText}>G</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, styles.appleButton]} disabled={loading}>
            <Text style={styles.socialButtonText}>
              <Ionicons name="logo-apple" size={24} color="white" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, styles.facebookButton]} disabled={loading}>
            <Text style={styles.socialButtonText}>f</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
    position: 'relative',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#70C18C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 32,
    fontWeight: '500',
    marginTop: 10,
  },
  bubbleSmall1: {
    position: 'absolute',
    top: -10,
    right: 50,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#86D9A0',
  },
  bubbleMedium: {
    position: 'absolute',
    top: 30,
    right: -20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#86D9A0',
  },
  bubbleSmall2: {
    position: 'absolute',
    bottom: 10,
    left: 50,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#86D9A0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 15,
  },
  forgotPassword: {
    textAlign: 'left',
    color: '#333',
    marginBottom: 20,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#70C18C',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Shadow for Android
    elevation: 4,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  arrowIcon: {
    marginLeft: 4,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  registerText: {
    fontSize: 16,
    color: '#666',
  },
  registerLink: {
    fontSize: 16,
    color: '#70C18C',
    fontWeight: '500',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  socialButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  appleButton: {
    backgroundColor: '#000',
  },
  facebookButton: {
    backgroundColor: '#4267B2',
  },
}); 