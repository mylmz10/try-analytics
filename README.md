# try-analytics

This is Vue based dashboard of try-analytics-tracker rest API (http://try-analytics-tracker.herokuapp.com/). 

## Screenshot
<div align="center">
    <img src="https://raw.githubusercontent.com/mylmz10/try-analytics/master/screenshot/screenshot.png" alt="screenshot" />
</div>

## Design notes
   
   ### Dashboard implementation
   
   - The project created with Vue CLI
   - Unit test added for which used component 
   - Dynamic import used in router for speed page loading
   - The CircleCI used for test.
   - Dockerfile implemented for auto deploy to herokuapp.
   - Env variables used for API URL etc.
   
   Note: We used heroku and the app has free web dyno and that dyno receives no web traffic in a 30-minute period, it will sleep.
   If a sleeping web dyno receives web traffic, it will become active again after a short delay (assuming your account has free dyno hours available). 
   More Detail: [https://devcenter.heroku.com/articles/free-dyno-hours#dyno-sleeping]
      
   ### Third-party libraries
   
   - Highchart and Highchart vue library added for draw line chart
   
   ## Further Improvement ideas
   
   - The new analytics and graphs should be added.
   - Token validation should be implemented 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
