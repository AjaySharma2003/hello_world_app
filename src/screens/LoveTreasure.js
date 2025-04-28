import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const LoveTreasure = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('PoemScreen'); // Navigating to the PoemScreen
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>💖 Love Treasure Found! 💖</Text>
      <Text style={styles.subtitle}>You have unlocked the treasure of love!</Text>
      <Image
        source={require('../assets/images/img1.jpg')}
        style={styles.image}
      />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>💘 Go to Play! 💘</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoveTreasure;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#d63384',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#c2185b',
    marginBottom: 32,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#ffb6c1',
  },
  button: {
    backgroundColor: '#ff66b2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});
