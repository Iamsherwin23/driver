import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Constants } from '../../../constants/constants';
import { globalStyle } from '../../../utils/styles';
import CustomText from '../../../components/CustomText';
import { useContext, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { CustomCardNews } from '../../../components/CustomCardNews';
import { fetchNewsFare } from '../../../services/service';
import CustomLoading from '../../../components/CustomLoading';
import AnnouncementModal from '../announcement/Annnouncement';

export default function NewsFeed() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [announceVisible, setAnnounceVisible] = useState(false);

    const [showSortOptions, setShowSortOptions] = useState(false);
    const [showDateOptions, setShowDateOptions] = useState(false);
    const [sortOrder, setSortOrder] = useState('Latest');
    const [dateFilter, setDateFilter] = useState('This Year');
    const [refreshing, setRefreshing] = useState(false);
    const [nodata, setNoData] = useState('');

    useEffect(() => {
        const initNews = async () => {
            setLoading(true);
            const response = await fetchNewsFare(sortOrder, dateFilter);
            if (response.newsData) {
                setData(response.newsData);
                response.newsData.length < 1 && setNoData("No data to display.")
            }
            setLoading(false);
        };

        initNews();
    }, [sortOrder, dateFilter]);

    const onRefresh = async () => {
        setRefreshing(true);
        const response = await fetchNewsFare(sortOrder, dateFilter);
        if (response.newsData) {
            setData(response.newsData);
            response.newsData.length < 1 && setNoData("No data to display.")
        }
        setRefreshing(false);
    };

    return (
        <View style={[{ backgroundColor: Constants.COLORS.GRAYISH_WHITE, position: 'relative' }, globalStyle.container]}>
            {loading && <CustomLoading />}
            {/* Header */}
            <View style={globalStyle.headerContainer}>
                <CustomText style={globalStyle.textTitle}>News Fare</CustomText>
                <TouchableOpacity activeOpacity={0.5} style={globalStyle.iconContainer} onPress={() => setAnnounceVisible(true)}>
                    <Ionicons name={'megaphone-outline'} size={30} style={globalStyle.announceIcon} />
                </TouchableOpacity>
            </View>
            <AnnouncementModal visible={announceVisible} onClose={() => setAnnounceVisible(false)} />
            <View style={style.filterBar}>
                <TouchableOpacity
                    onPress={() => {
                        setShowSortOptions(!showSortOptions);
                        setShowDateOptions(false);
                    }}
                    style={style.filterItem}
                >
                    <Text style={style.filterValue}>{sortOrder} ˇ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setShowSortOptions(false);
                        setShowDateOptions(!showDateOptions);
                    }}
                    style={style.filterItem}>
                    <Text style={style.filterValue}>{dateFilter} ˇ</Text>
                </TouchableOpacity>
            </View>
            {showSortOptions && (
                <View style={style.dropdown}>
                    {['Latest', 'Oldest'].map((option) => (
                        <TouchableOpacity
                            key={option}
                            onPress={() => {
                                setSortOrder(option);
                                setShowSortOptions(false);
                            }}
                        >
                            <Text style={style.dropdownItem}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {showDateOptions && (
                <View style={style.dropdown}>
                    {['Last 24h', 'This Month', 'This Year'].map((option) => (
                        <TouchableOpacity
                            key={option}
                            onPress={() => {
                                setDateFilter(option);
                                setShowDateOptions(false);
                            }}
                        >
                            <Text style={style.dropdownItem}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}


            {/* Main Content */}
            <ScrollView
                style={style.main}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {
                    data?.length > 0
                        ? data.map((data, index) => (
                            <CustomCardNews details={data} key={index} index={index} />
                        ))
                        : <CustomText >{nodata}</CustomText>
                }
            </ScrollView>

        </View>
    )
}

const style = StyleSheet.create({
    main: {
        padding: Constants.PADDING.SMALL,
        overflow: 'scroll'
    },
    text: {
        fontFamily: 'Montserrat'
    },
    textHeader: {
        fontFamily: 'Montserrat-Bold',
        fontSize: Constants.SIZE.REGULAR
    },
    detailsText: {
        fontFamily: 'Montserrat-Bold'
    },
    filterBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Constants.PADDING.SMALL,
        paddingTop: 10,
    },
    filterItem: {
        flexDirection: 'row',
    },
    filterLabel: {
        fontSize: 12,
        color: '#888',
        fontFamily: 'Montserrat',
    },
    filterValue: {
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        color: Constants.COLORS.BLACK,
    },
    dropdown: {
        backgroundColor: '#fff',
        position: 'absolute',
        top: 150, // Adjust based on your layout
        left: 10,
        right: 10,
        zIndex: 99,
        elevation: 3,
        padding: 10,
        borderRadius: 6,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    dropdownItem: {
        paddingVertical: 8,
        fontFamily: 'Montserrat',
        fontSize: 14,
    }
});