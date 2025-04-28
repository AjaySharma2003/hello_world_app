import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';

// Import the JSON file
import poems from '../assets/files/poems.json'; // Correct path

const { width, height } = Dimensions.get('window');

// Single Heart Component
const Heart = ({ style, scaleAnim }) => {
  return (
    <Animated.View style={[styles.heart, style, { transform: [...style.transform, { scale: scaleAnim }] }]}>
      <Text style={{ fontSize: 24 }}>💖</Text>
    </Animated.View>
  );
};

// Single Star Component
const Star = ({ style, opacityAnim }) => {
  return (
    <Animated.View style={[styles.star, style, { opacity: opacityAnim }]}>
      <Text style={{ fontSize: 10 }}>✨</Text>
    </Animated.View>
  );
};

const PoemScreen = () => {
  const [poemTitle, setPoemTitle] = useState('');
  const [poemText, setPoemText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  const hearts = useRef([]);
  const stars = useRef([]);

  useEffect(() => {
    // Create Floating Hearts
    for (let i = 0; i < 8; i++) {
      createFloatingHeart(i);
    }
    // Create Twinkling Stars
    for (let i = 0; i < 20; i++) {
      createTwinklingStar(i);
    }
  }, []);

  const createFloatingHeart = (index) => {
    const animation = new Animated.Value(height);
    const scaleAnim = new Animated.Value(1);

    hearts.current[index] = {
      animation,
      left: Math.random() * (width - 50),
      size: Math.random() * 20 + 20,
      opacity: Math.random() * 0.5 + 0.5,
      scaleAnim,
    };

    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: -100,
          duration: 4000 + Math.random() * 4000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: height,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const createTwinklingStar = (index) => {
    const opacityAnim = new Animated.Value(Math.random());

    stars.current[index] = {
      left: Math.random() * width,
      top: Math.random() * height,
      opacityAnim,
    };

    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handlePress = () => {
    let randomNumber = Math.floor(Math.random() * 126) + 1;
    const poem = poems.find(item => item.sequence === randomNumber);

    if (poem) {
      setPoemTitle(poem.title);
      setPoemText(poem.poem);
      setErrorMessage('');
    } else {
      setPoemText('');
      setPoemTitle('');
      setErrorMessage(`💔 "Even the stars seem shy tonight... No poem found for number ${randomNumber}."`);
    }

    // Start Fade Animation for poem
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Twinkling Stars */}
        {stars.current.map((star, index) => (
          <Star
            key={`star-${index}`}
            style={{
              position: 'absolute',
              top: star.top,
              left: star.left,
            }}
            opacityAnim={star.opacityAnim}
          />
        ))}

        {/* Floating Hearts */}
        {hearts.current.map((heart, index) => (
          <Heart
            key={`heart-${index}`}
            style={{
              position: 'absolute',
              left: heart.left,
              transform: [{ translateY: heart.animation }],
              opacity: heart.opacity,
              width: heart.size,
              height: heart.size,
            }}
            scaleAnim={heart.scaleAnim}
          />
        ))}

        {/* Poem Scroll Content */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
            {poemTitle ? `🌸 ${poemTitle} 🌸` : '🌸 Love’s Whisper 🌸'}
          </Animated.Text>

          {poemText ? (
            <Animated.Text style={[styles.poem, { opacity: fadeAnim }]}>{poemText}</Animated.Text>
          ) : (
            errorMessage && <Animated.Text style={[styles.error, { opacity: fadeAnim }]}>{errorMessage}</Animated.Text>
          )}
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>✨ Find My Poem ✨</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default PoemScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffe6f0',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#d63384',
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  poem: {
    fontSize: 20,
    color: '#800040',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 30,
    fontFamily: 'serif',
  },
  error: {
    fontSize: 18,
    color: '#ff4d88',
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  bottomButtonContainer: {
    padding: 20,
    backgroundColor: '#ffe6f0',
  },
  button: {
    backgroundColor: '#ff66b2',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: '#ff66b2',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  heart: {
    position: 'absolute',
  },
  star: {
    position: 'absolute',
  },
});
