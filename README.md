# Push

This is a web-app for keeping track of Push scores.

Push is basically a rummy game, in which you need to meld the basic goal of
each hand, after which you can continue to place sets and runs, and play off
other players' melded tricks. The first player to have no remaining cards is
the winner of the hand, and the player with the fewest points at the end of
all the hands is the winner of the game.

But the rules of Push aren't as important to this app -- you play the game in
real life, this just keeps the scores so you don't have to use paper and math
to do it on your own.

It will remember your games in local storage in your browser. There is no
backend server, so there's no logging in or anything like that.

The app deploys to Cloudflare Pages automatically when there is a new merge
into the `master` branch.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

