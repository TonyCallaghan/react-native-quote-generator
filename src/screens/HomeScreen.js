import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Text, StyleSheet, Dimensions } from 'react-native';
import Circle from '../components/Circle';
import { appStyles } from '../styles/appStyles';
import { getQuote } from '../utils/quotes';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const animatedValue2 = useRef(new Animated.Value(0)).current;
    const sliderAnimatedValue = useRef(new Animated.Value(0)).current;
    const [index, setIndex] = useState(0);
    const [quotes, setQuotes] = useState([]);

    // Fetch a new quote
    useEffect(() => {
        const fetchQuote = async () => {
            const quote = await getQuote();
            setQuotes((prevQuotes) => [...prevQuotes, quote]);
        };
    
        fetchQuote();
    }, []);


    const inputRange = [...Array(quotes.length).keys()];

    
    // Animate transition of quotes
    const animate = (i) => {
        if (quotes.length < 2) {
          return Promise.resolve();
        }
        return Animated.parallel([
          Animated.timing(sliderAnimatedValue, {
            toValue: i,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue2, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
        ]).start();
      };
      

      const onPress = () => {
        animatedValue.setValue(0);
        animatedValue2.setValue(0);
        animate((index + 1) % appStyles.colors.length);
        setIndex((index + 1) % appStyles.colors.length);
    
        const fetchNewQuote = async () => {
            const quote = await getQuote();
            setQuotes((prevQuotes) => [...prevQuotes, quote]);
        };
        fetchNewQuote();
    };

    return (
        <View style={styles.container}>
            <Circle
                index={index}
                onPress={onPress}
                quotes={quotes}
                animatedValue={animatedValue}
                animatedValue2={animatedValue2}
            />
            {
                quotes.length > 1 ? (
                    <Animated.View
                        style={{
                            flexDirection: 'row',
                            transform: [
                                {
                                    translateX: sliderAnimatedValue.interpolate({
                                        inputRange,
                                        outputRange: quotes.map((_, i) => -i * width * 2),
                                    }),
                                },
                            ],
                            opacity: sliderAnimatedValue.interpolate({
                                inputRange: [...Array(quotes.length * 2 + 1).keys()].map(
                                    (i) => i / 2
                                ),
                                outputRange: [...Array(quotes.length * 2 + 1).keys()].map((i) =>
                                    i % 2 === 0 ? 1 : 0
                                ),
                            }),
                        }}
                    >
                        {quotes.slice(0, appStyles.colors.length).map(({ quoteText, quoteAuthor }, i) => {
                            return (
                                <View style={{ paddingRight: width, width: width * 2 }} key={i}>
                                    <Text
                                        style={[
                                            styles.paragraph,
                                            { color: appStyles.colors[i].nextBgColor },
                                        ]}
                                    >
                                        {quoteText}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.paragraph,
                                            {
                                                color: appStyles.colors[i].nextBgColor,
                                                fontSize: 10,
                                                fontWeight: 'normal',
                                                textAlign: 'right',
                                                opacity: 0.8,
                                            },
                                        ]}
                                    >
                                        ______ {quoteAuthor}
                                    </Text>
                                </View>
                            );
                        })}

                    </Animated.View>
                ) : (
                    <Text>Loading...</Text>
                )
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 100,
        ...appStyles.container,
    },
    paragraph: {
        margin: 12,
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Menlo',
        color: 'white',
    },
});
