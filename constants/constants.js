const Constants = {

    COLORS: {
        RED: '#EF4136',
        BLACK: '#050505',
        GRAYISH_WHITE: '#E8E8E8',
        RED: '#D33333',
        RED_TINT: 'rgba(211, 51, 51, 0.15)',
        DARK_RED: '#802626',
        WHITE: '#FFFFFF',
        GRAY: '#777777',
        FADED_BLACK: '#343341',
        BLUE: '#277fcf',
        GREEN: '#45de5c',
        YELLOW: '#f2d635'
    },

    SIZE: {
        REGULAR: 16,
        X_REGULAR: 18,
        X_SMALL: 14,
        HEADINGS: 32,
        LARGE: 45,
        LABELS: 12,
        SMALL: 10,
        MEDIUM: 24,
        X_MEDIUM: 20,
        X_LARGE: 55
    },

    PADDING:{
        REGULAR: 24,
        MEDIUM: 40,
        LARGE: 80,
        X_LARGE: 100,
        SMALL: 12,
        XSMALL: 8,
    },
    MARGIN:{
        REGULAR: 24,
        MEDIUM: 40,
        LARGE: 80,
        SMALL: 12
    },

    BORDERS: {
        RADIUS_SMALL: 20,
        RADIUS_NORMAL: 24,
        RADIUS_LARGE: 40
    },

    API_ROUTE: {
        // Local
        // API_ENDPOINT: "http://192.168.1.30:8000",

        // Production
        API_ENDPOINT: "https://trikefare.com/server/public",
        IMAGE_ENDPOINT: "https://trikefare.com/server/public"
    }

}

export { Constants };