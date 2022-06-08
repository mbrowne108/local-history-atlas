# Phase 5 Project - Flatiron School

# Atlas of Curiosities

This is an app to keep track of and add new interesting local history sites anywhere in the world.

Deployed app can be viewed at [https://atlas-of-curiosities.herokuapp.com/](https://atlas-of-curiosities.herokuapp.com/). Use admin login to view. UN: matt PW: 123

## Purpose of the App

This is the culmination of a Flatiron School phase teaching React, Ruby, Active Record, and Rails. In this app you can add new historical sites and have users log in and visit, rate, and comment on them. The locations of these site are mapped on a Google Map in the ``Map View`` tab, and users can click on each pin to show various bits of information. Additional information, including other user comments, are included in the ``List View`` tab.

## Technologies used

In this project I use the following technologies:

    1. CSS (Bootstrap)
    2. HTML/JSX
    3. React
    4. Redux
    5. Ruby
    6. Active Record
    7. Rails
    8. Active Storage

## Libraries Used

The following libraries are also used:

1. [Google-Map-React](http://www.npmjs.com/package/google-map-react/)
2. [React-Bootstrap](http://react-bootstrap.github.io/)
3. [React-Redux](http://react-redux.js.org/)
4. [React-Geocode](http://www.npmjs.com/package/react-geocode/)

## Front End (React)
To start the front end server, run : ``npm start --prefix client`` The server will be hosted on [http://localhost:4000](http://localhost:4000)

The front end consists of React components fetching data from our JSON API, using fetch requests to perform CRUD actions.

Additionally, the site is hosted on Heroku at [atlas-of-curiosities.herokuapp.com/](https://atlas-of-curiosities.herokuapp.com/). The following actions below can be accessed on the remote server by replacing **localhost:4000** with **atlas-of-curiosities.herokuapp.com/**.


You may create your own user login or additionally check out the admin user: Username: ``matt``, Password: ``123``

### READ
- #### GET: ``useEffect`` on the ``/sites`` and ``/visits`` tables reads all data from the API.
- #### GET: ``useEffect`` on the ``/me`` route reads the current user.

### UPDATE
- #### PATCH: In the ``List View`` tab, clicking on ``Show More`` in any site's card will open site details with user comments below. If the current user has commented, clicking on the ``edit`` button will allow them to edit their comments and update that visit in the database.

### CREATE
- #### POST: On either the ``Map View`` or ``List View`` tabs, clicking on the ``+`` will open up a ``New Site Form``, where you can add info to create a new site in the database.
- #### POST: In the ``Map View`` tab, clicking on a ``White Map Pin`` icon on the list at the right creates a new visit to this site by the current user, where you can enter a comment, rating, and upload a photo using ``Active Storage``
- #### POST: On the initial ``Sign Up`` screen, filling out the ``Sign Up Form`` posts a new user to the database, with authentication.
- #### POST: On the initial login screen, filling out the ``Login Form`` posts a new session to the database, with associated user data.

### DELETE
- #### DELETE: In the ``List View`` tab, clicking on ``Show More`` in any site's card will open site details with user comments below. If the current user has commented, clicking on the ``delete`` button will delete this visit from the database. This can also be accomplished in the ``Map View`` by clicking on a ``Red Map Pin`` icon on the list at the right and confirming you'd like to delete the visit.

## Back End (Ruby, ActiveRecord, Rails)
To start the back end server, run : ``rails s`` The server will be hosted on [http://localhost:3000](http://localhost:3000)

The front end consists of React components fetching data from our JSON API, using fetch requests to perform CRUD actions.

Additionally, the site is hosted on Heroku at [atlas-of-curiosities.herokuapp.com/](https://atlas-of-curiosities.herokuapp.com/). The following actions below can be accessed on the remote server by replacing **localhost:3000** with **atlas-of-curiosities.herokuapp.com/**.

### READ
- #### GET [localhost:3000/sites](http://localhost:3000/sites): Gets a list of every historical site in the database, with their corresponding users and visits.
- #### GET [localhost:3000/sites/:id](http://localhost:3000/sites/:id): Gets a specific site from the database.
- #### GET [localhost:3000/visits](http://localhost:3000/visits): Gets a list of every visit in the database, with their corresponding user and site.
- #### GET [localhost:3000/visits/:id](http://localhost:3000/visits/:id): Gets a specific visit from the database.
- #### GET [localhost:3000/me](http://localhost:3000/me): Gets the currently logged in user, and all their visits.

### UPDATE
- #### PATCH [localhost:3000/visits/:id](http://localhost:3000/visits/:id): Updates a user's visit in the database, specifically the content of their comment or rating.

### CREATE
- #### POST [localhost:3000/sites](http://localhost:3000/sites): Creates a new site.
- #### POST [localhost:3000/visits](http://localhost:3000/visits): Creates a new visit for the current user to a corresponding site. 
- #### POST [localhost:3000/signup](http://localhost:3000/signup): Creates a new user with authentication.
- #### POST [localhost:3000/login](http://localhost:3000/login): Creates a new session with an associated user.

### DELETE
- #### DELETE [localhost:3000/visits/:id](http://localhost:3000/visits/:id): Deletes a specific visit from the current user.
- #### DELETE [localhost:3000/logout](http://localhost:3000/logout): Deletes a user's current session.

## License
[MIT](https://choosealicense.com/licenses/mit/)