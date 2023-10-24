# Buushido_Frontend

Front-end code for the buushido website.

## 🚀 Project Structure

All pages are present in pages folder and can be acccess by 

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
    (We would store the styles here in order to be fetched asynchronously)
├── src/
│   └── pages/
│       └── index.astro
        (main website pages...)
│   └── components/
│       └── navbar.jsx
        (react components of the different pages)
│   └── layout/
│       └── footer.astro
        (Different layout to load accross different pages)
│   └── background_processes/
│       └── check_connection.js
        (Javascript function for metrics system and user informations management)
   
└── package.json
```

## Usage
Make sure to have access to an internet connection or make sure to have a server running the backend of the buushido website.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI    

## Recommendation System Implementation
all the related code is located in :
```
└── background_processes/
│       └── recommendations/
```
### Getting the Recommendations
Main function : fetch_recommendations()

Based on the user interactions with the website, we retain the shows the user have interacted with and after a certain threshold of interactions have been reached, we make a request to the server with that information to get a list of recommendations. The recommendations are stored in the localStorage in order to access them from different part of the website without the need to make a new request.

Whenever a new threshold of interactions have been reached, we make a request to the server with all the previous and actual informations but ordered from most recent to least recent. We then get a new batch of recommendations and repeat the process for every new threshold.

If it is the user first time on the website, we make a special request to the server to get a random list of the most liked and popular show and recommend them to the user before we reach the threshold of interactions.

### Displaying the recommendations
Main function : get_recommendations()

The goal is to display the recommendations in a non invasive manner unless the user is definetly interested in them.
We have a function get_recommendations, that will return the list of most recent recommendations in the localStorage.

Our first point of display is the Navbar/search_bar. Before the user start typing its search querry, small portion of the recommended show will be randomly selected and displayed to the user with a button to access the full list if needed. At any point if the user choose to keep writing its search querry the recommendations will disapeer.

The recommendation button. We have a recommendation button located in the search bar and also in the user profile menu. When clicked, it will display recommendation window with all the recommended shows with options to watch, label as already watched, save in watchlist or express dislike.

### Label for recommendations
Main functions : Label(), sendLabel()

We will need to label the recommendations and the watched shows in order to further train our model. 
The label function gives a label to the a show based on the user interaction with it or based on the raw label given from the recommendation page.

The interaction is mesured with the help of a timer that will determine if the user has been engaging with a content or not.
The different options are : 0 for dislike, 0.5 for unconclusive, and 1 for like.
The label values are then added stored in an object with the showId and its label and the overall is then stored in "hashmap" object for O(1) retrieval or modification.

The label are sent to the server using the sendLabel function whenever a new fetch request is made to the server to get new recommendations.

### Specific recommendation Page
Work in progress...
A new page where the user will be able to directly specifiy his most recent or appreciated show in order to get direct recommendations from the user.
