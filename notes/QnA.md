
## 1. What does 'ngView' directive does?
A: It does following things:
    - Anytime $routeChangeSuccess event is fired, the view will update
    - If there is a template associated with current route
        - Create a new scope
        - Remove the last view, which cleans up the last scope
        - Link the new scope and new template
        - Link the controller to the scope, if specified
        - Emits the '$viewContentLoaded' event
        - Run the `onLoad` attribute function, if provided

## 2. We should never use $apply in our code unless there is some changes happening outside Angular. Research more on why we have
   $apply when we use Parse service?
A: Parse services return a promise which is not an Angular promise. So the data is getting outside Angular and one otpion is we call
   $apply manually (or) we can retur promise from Angular service api and resolve based on success or failure. Please look at `parseservice.js`.

## 3. How do we refresh a page in Angular?
A: Use $window.location object

## 4. What is the easist way to return a promise to the caller where there is no Async involved?
A: $q.when(true)

##5. What is 'git flow" and how it is beneficial to teams \ developers?
A:

##6. What is the difference between $compile and $link in Directives?
A: