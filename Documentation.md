PROJECT ARCHITECTURE:

- API folder containing fetching functions

- COMPONENTS folder containing, you guessed it, all .TSX components. Some of them are stored in the COMMON subfolder. Such componnets are used
on a more global level. Components used in the navbar portion of the project are held in the respective USER-NAV-BAR folder.

- HOOKS folder contains the 2 custom hooks that are used in the project.

- PAGES folder contains all the pages used in the project.

- SUPABASE folder contains the necessary keys and function to incorporate the OSS database Supabase.

The general SRC folder contains the App.tsx, main.tsx and types.ts files.


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