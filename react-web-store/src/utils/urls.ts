export enum ROUTE_PATH {
    HOME = '/',
    SELL_ITEMS= 'sell-items',
    CART = 'cart',
    CATEGORY_PAGE = 'categories/:category_id',
    CATEGORY_ITEM_DETAILS = 'categories/:category_id/:item_id',
    REGISTER = '/register',
    LOGIN = '/login',
    SEARCH_ITEM_RESULT = 'search/:item_id',
    SEARCH_RESULTS = 'search-result/:searchParams',
    MY_OFFERS = 'my-offers',
    MY_WISHLIST = 'my-wishlist',
    EDIT_OFFER = 'edit/:itemid',
    NOT_FOUND = '*'
}