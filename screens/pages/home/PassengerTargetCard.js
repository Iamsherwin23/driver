import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const PassengerTargetCard = ({ netStatus, current = 0, target = 0 }) => {
    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.card,
                    { height: SCREEN_HEIGHT * (netStatus === 'Offline' ? 0.73 : 0.75) },
                ]}
            >
                <View style={styles.circle}>
                    <Text style={styles.circleLabel}>Passenger</Text>
                </View>
                <Text style={styles.count}>
                    <Text style={styles.currentCount}>{current}</Text>/{target}
                </Text>
            </View>
        </View>
    );
};

PassengerTargetCard.propTypes = {
    netStatus: PropTypes.string.isRequired,
    current: PropTypes.number,
    target: PropTypes.number,
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    circle: {
        borderWidth: 4,
        borderColor: '#f28c8c',
        borderRadius: 999,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    circleLabel: {
        fontWeight: 'bold',
        color: '#000',
    },
    count: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    currentCount: {
        color: '#f28c8c',
    },
});

export default PassengerTargetCard;
