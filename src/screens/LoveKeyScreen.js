import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';

const LoveKeyScreen = ({ navigation }) => {
  const [key, setKey] = useState('');
  const [countdown, setCountdown] = useState(null); // null = no countdown
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let timer;

    if (unlocked && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (unlocked && countdown === 0) {
      navigation.navigate('LoveTreasure');
    }

    return () => clearTimeout(timer);
  }, [countdown, unlocked]);

  const handleUnlock = () => {
    if (key.trim().toLowerCase() === '100001') {
      setUnlocked(true);
      setCountdown(10); // Start countdown from 10
    } else {
      alert('💔 Oops... That’s not the right key to the heart!');
    }
  };

  if (unlocked) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.countdownTitle}>💖 Love Countdown 💖</Text>
        <Text style={styles.countdownText}>{countdown}</Text>
        <Text style={styles.subtitle}>Counting down to your treasure...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/img1.jpg')}
        style={styles.image}
      />
      <Text style={styles.title}>Unlock the Heart 🔐</Text>
      <Text style={styles.subtitle}>Enter the secret love key to reveal the treasure within 💘</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your love key"
        placeholderTextColor="#c88"
        value={key}
        onChangeText={setKey}
      />

      <TouchableOpacity style={styles.button} onPress={handleUnlock}>
        <Text style={styles.buttonText}>💌 Unlock</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoveKeyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 24,
    borderWidth: 4,
    borderColor: '#ffb6c1',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#d63384',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#c2185b',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffe6ec',
    borderColor: '#f7b6c2',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    color: '#d63384',
  },
  button: {
    backgroundColor: '#ff69b4',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  countdownTitle: {
    fontSize: 28,
    color: '#e91e63',
    fontWeight: '700',
    marginBottom: 20,
  },
  countdownText: {
    fontSize: 72,
    color: '#ff1493',
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
