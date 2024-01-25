import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { COLORS } from '../../constants';
import { AntDesign } from '@expo/vector-icons';

const CollapseComponent = ({ title, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    outputRange: [0, 180] // Adjust the height as needed
  });

  const styles = {
    container: {
      overflow: 'hidden',
      marginTop: 10,
      borderColor: '#f1f1f1',
      borderWidth: 1,
      borderRadius: 5
    },
    content: {
      height: heightInterpolate,
      backgroundColor: COLORS.white,
      padding: 10,
      justifyContent: 'center'
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f1f1f1',
      padding: 15
    },
    title: {
      fontSize: 14,
      paddingHorizontal: 10,
      color: COLORS.black
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapse}>
        <View style={styles.titleContainer}>
          <AntDesign
            name={isCollapsed ? 'right' : 'down'}
            size={18}
            color='grey'
          />
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
      <Animated.View style={[styles.content]}>{children}</Animated.View>
    </View>
  );
};

export default CollapseComponent;
