import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

const CollapseComponent = ({ title, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isCollapsed ? 0 : 1,
      duration: 300,
      useNativeDriver: false // Make sure to set useNativeDriver to false if you use LayoutAnimation
    }).start();
  }, [isCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200] // Adjust the height as needed
  });

  const styles = {
    container: {
      overflow: 'hidden',
      marginTop: 10
    },
    content: {
      height: heightInterpolate,
      backgroundColor: 'lightgray',
      padding: 10
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'gray',
      padding: 10
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'white'
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapse}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
      <Animated.View style={[styles.content]}>{children}</Animated.View>
    </View>
  );
};

export default CollapseComponent;
