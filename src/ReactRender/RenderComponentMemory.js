/**
 * @format
 */

import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const Child = ({ id, onMount }) => {
  useLayoutEffect(() => {
    onMount(id);
  }, [id, onMount]);

  return (
    <View style={styles.child}>
      <Text style={styles.childText}>{id}</Text>
    </View>
  );
};

const RenderComponentMemory = ({ totalCount }) => {
  const [children, setChildren] = useState([0]);
  const [shouldContinue, setShouldContinue] = useState(true);
  const latestChildren = useRef(children);

  function appendChild(id) {
    setTimeout(() => setChildren(array => [...array, id]), 0);
  }

  function handleChildDidMount(id) {
    if (id >= totalCount) {
      setShouldContinue(false);
      console.log(`count=${latestChildren.current.length}`);
      return;
    }
    if (shouldContinue && id === children.length - 1) {
      appendChild(id + 1);
    }
  }

  useEffect(() => {
    latestChildren.current = children;
  });

  return (
    <ScrollView style={styles.scrollView}>
      {children.map(i => (
        <Child key={i} id={i} onMount={handleChildDidMount} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  child: {
    alignSelf: 'center',
    width: 120,
    height: 16,
    marginVertical: 8,
    backgroundColor: 'lightblue',
  },
  childText: {
    textAlign: 'center',
  },
});

export default RenderComponentMemory;
