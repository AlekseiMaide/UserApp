# UserApp

##### App-Spring
    gradle clean bootRun;

All sorting, filtering, paging and search operations are supported by a single endpoint:
    
    GET /user
    GET /user?orderBy=firstName:asc,lastName:desc
    GET /user?searchName=searchString
    GET /user?size=50&page=1

##### App-React

Created using create-react-app.
Uses MaterialUI for 'better' visuals.

    npm install
    npm start