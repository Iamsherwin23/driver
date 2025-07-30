import { Constants } from "../constants/constants";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import RenderHtml from 'react-native-render-html';
import CustomText from "./CustomText";
import { useMemo } from 'react';

const CustomCardNews = ({ details, index }) => {
    const { width } = useWindowDimensions();
    const htmlSource = useMemo(() => ({ html: details.details }), [details.details]);
    const tagsStyles = useMemo(() => ({
        p: { textAlign: 'center' },
        li: { textAlign: 'center' },
        ul: { textAlign: 'center' },
        ol: { textAlign: 'center' },
        div: { textAlign: 'center' },
        span: { textAlign: 'center' },
        h1: { textAlign: 'center' },
        h2: { textAlign: 'center' },
        h3: { textAlign: 'center' },
        h4: { textAlign: 'center' },
        h5: { textAlign: 'center' },
        h6: { textAlign: 'center' },
        strong: { textAlign: 'center' },
        em: { textAlign: 'center' },
        img: { alignSelf: 'center' },
    }), []);

    const cardBackground = index === 0 ? '#cccccc' : Constants.COLORS.WHITE;

    return (
        <View style={[style.card, { backgroundColor: cardBackground }]}>
            <View style={style.details}>
                <RenderHtml
                    contentWidth={width}
                    source={htmlSource}
                    tagsStyles={tagsStyles}
                />
                <CustomText style={style.dateText}>{details.date_posted}</CustomText>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderRadius: 10,
        minHeight: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Constants.PADDING.SMALL,
        marginBottom: Constants.MARGIN.SMALL
    },
    details: {
        flex: 1,
        padding: 10,
    },
    dateText: {
        fontSize: 10,
        marginTop: 10, 
        textAlign: 'right',
        color: Constants.COLORS.RED,
        fontWeight: 600,
    }
});

export { CustomCardNews };
