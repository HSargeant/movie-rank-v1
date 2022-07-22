# Movie Rank Ver1
Movie Rank is a site where people can add their favorite movies to the list and vote on movies they like. The goal is to get a community ranking of everyones favorite movies.

**Link to project:** https://movierankv1.herokuapp.com/

![movie rank](https://images4.imagebam.com/69/b3/91/MEBTATL_o.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node.Js, Express, MongoDb, EJS

I used node/express to build the server to handle the request to add movies and add/remove user likes. Used MongoDb for my database to store the current list of movies and their like count. EJS was used to keep the front end up to date with current rankings and movies that are added/deleted.

## Optimizations

As the site is an ongoing project I plan to add user authentication to keep tract of user likes and to allow users to create their own personalized collection of favorite movies, in additonation to the community rankings, that they can share with frieds on social media etc..
(currently I am keeping track of user likes with local storage and IPs)

## Lessons Learned:

I learned to be very thoughtful and patient in testing your apps for proper performace across various browsers and devices. 