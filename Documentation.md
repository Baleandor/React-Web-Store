PROJECT ARCHITECTURE:

- API folder containing fetching functions

- COMPONENTS folder containing, you guessed it, all .TSX components. Some of them are stored in the COMMON subfolder. Such componnets are used
on a more global level. Components used in the navbar portion of the project are held in the respective USER-NAV-BAR folder.

- HOOKS folder contains the 2 custom hooks that are used in the project.

- PAGES folder contains all the pages used in the project.

- SUPABASE folder contains the necessary keys and function to incorporate the OSS database Supabase.

The general SRC folder contains the App.tsx, main.tsx and types.ts files.


1. HOME PAGE
Home/landing page, along with the rest of the pages, contains the nav bar on top. It's actual content is a collection of Dad Dok's show off items. They're
brought in by the Dok Stock component, which takes basic information as props and utilizes the Wishlist button. Said button will make a POST request
to the database and add the clicked item to the user's Wishlist collection.


2. REGISTER PAGE
The page will take in the user's inputed information through the use of the react-hook-form library, pass it through the Zod library validator, and then make a POST
request to the database with the information if there are no errors. If the validator catches any errors, an angry Shrek will popup, notifying the user of their faults.
Upon successful registration, the useNavigate hook will redirect the user to the home page.

3. LOGIN PAGE
The page will take in the user's login information through the use of the react-hook-form library and pass it through the Zod validator. If there are no errors, a GET 
request will be made to the database, and upon success the user will be logged in and redirected to the home page. Upon any input errors, an angry Shrek will popup to
scold the user. Upon any database errors, an alert message will appear.


4. MY OFFERS & MY WISHLIST PAGES
Both pages are user-created collections pulled with a GET request from the databse. First, the pages will authenticate the user using the tanstack query library.
If any errors are meat, an alert message will appear. Both pages have a delete function wich simply sends a delete request to the database.
The MY OFFERS page also has an edit functionality.


5. EDIT MY OFFERS PAGE
The page will load the item's current information using the tanstack query library along with the useState hook into a react-hook-form form. The inputs will be
validated through the zod validator again and upon success an UPDATE request will be made to the database. Upon any input errors, an angry Shrek will popup to
scold the user. If any database errors appear, an alert message will show. Upon success on everything, the user will be redirected to the MY OFFERS page.


6. CART PAGE
The cart page contains the collection of items that are added to the cart through the Cart functionality. Said items are made in the ItemsInCart component. The page
uses the custom useCart hook's totalPrice and cartItems functions to set the total price of all products combined and to send the cartItems data into the ItemsInCart component.


7. CATEGORY PAGE
Through the use of the useParams hook, the page makes a GET request to the FAKESTORE.API 3rd party resource through the tanstack query library and returns a collection
of items. Said items' data is passed through the CategoryItem component which can later display additional information after click on the Details button.


8. CATEGORY DETAIL PAGE
The page will make a GET request to the FAKSTORE.API resource through tanstack query, utilizing the useParams hook and the page's URL, and will return data of the
specific item. Said item also possesses the Wishlist and Cart functionalities which allow it to be added to either the user's wishlist or the cart.


9. SEARCH RESULT PAGE
By using the useParams hook and tanstack query, the page will make a GET request to the FAKESTORE.API resource with the paramaters taken from the search bar and return
all results that match what FAKESTORE.API has.


10. SELL ITEMS PAGE
The page will take the user's input through a react-hook-form form, validate it through Zod, and upon success will make a POST request to the database. Any input errors
will be meat with an angry Shrek notifying the user where corrections are needed. If there are any database errors, an alert message will popup. 


11. THE NAV BAR
The nav bar contains Categories dropdown, search bar, user profile, Sell Items, cart, and home redirect image components.
The categories drop down component will make a GET request to the FAKESTORE.API resources using tanstack query and display the results as clickable options.
The search bar will make a GET request to the FAKESTORE.API resource and return any matching items as clickable links.
The user profile contains a drop down menu which redirects the user to their wishlist, offers, or logs them out. 
Sell Items will redirect the user to the Sell Items page
The cart icon will show a number representing the total items in the cart. Upon clicking it, it will redirect the user to the Cart page.



FUNCTIONS:

getAllCategories uses the axios library to perform a fetch request to the 3rd party URL FAKESTORE.API and returns a resolved promise containing
an array with the product categories.

getCategory uses the axios library to perform a fetch request to the 3rd party URL FAKESTORE.API and returns a resolved promise containing
an array with all the products within the chosen category.

getCategoryItem uses the axios library to perform a fetch request to the 3rd party URL FAKESTORE.API and returns a resolved promise containing
a singular product in the chosen category.

getAllItems uses the axios library to perform a fetch request to the 3rd party URL FAKESTORE.API and returns a resolved promise containing
an array with all the products regardless of their category.

handleToggleDropdown handles the state of the category drop down menu's visibility and is passed down to the CategoriesDropdown component.

handleOnChange handles the search bar input state.

autofillResult filters all the products from the FAKESTORE.API resource and returns the products whose title contain what is inside the search bar input.

handleSellItemsClick checks whether or not the user is signed in and redirects them to the Sell Items page. If not, they're redirected to the Login page.

handleProfileToggle handles the visibility of the profile drop down menu and is passed down to the UserProfileDropDown component.

logout logs the user out.

handleCart checks if the user is logged in, and if it is so, allows the user to add an item to the Cart. Otherwise, it redirects them to the Login page.

handleAddToWishlist checks if the user is logged in, and if it is so, makes a POST request to the supabase database. Otherwise, the user is redirected to the login page.

useCart is a custom hook for the cart functionalities.

CartProvider serves as the bedrock for the useCart custom hook. It returns a provider with all the useCart functions.

USECART FUNCTIONS:
getItemQuantity returns a number equal to the amount of products with the same id in the cart.
increaseItemCartQuantity increases the quantity of a product in the cart. If that number was 0 before executing the function, it will add it to the cart.
decreaseItemCartQuantity decreases the quantity of a product in the cart. If that number was to reach 0, it will remove the item from the cart.
removeFromCart removes an item from the cart, regardless of the quanitity numbers.
setItemPrice sets the price of the current products.

useLocalStorage checks whether or not there's something in the localStorage.

onSubmit in the EditmyOffers page takes the input data from the Edit form and makes an UPDATE request to the supabase databse. On success it updates the user's item data.

onSubmit in the Login page takes the input from the login form and makes a GET request to the supabase database. On success it logs the user in.

handleDelete deletes a user's custom product.

onSubmit in the Register page takes the input from the register form and makes a POST request to the supabase database. On success it registers a new user.

onSubmit in the SellItemsPage takes the input from the form and makes a POST request to the supabase database. On success it adds the new item to the user's offerings collection.

Router creates the routing for the project.