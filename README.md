# Resty

[Live Site](https://lucent-cucurucho-acc433.netlify.app/)

![UML](./lab26uml.png)

This app will allow a user to specify a URL for where they want their data from, then specify a CRUD method. If the user selects PUT/POST then the user will need to give a body so that the app can make an appropriate request

- for lab27 we had to refactor our App into a function and start using state through hooks. Now our form actually passes data up to App in order for App to show it on the screen

- for lab 29 we changed out the old useState stuff for useReduce which allows us to make one reduce function that listens for any dispatches that match a certain type. This might be a bit tedious for such a small project but one can definitely see that this is the way to go for a large project that has lots of diiferent things in state
