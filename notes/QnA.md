
1. What does 'ngView' directive does?
A: It does following things:
    - Anytime $routeChangeSuccess event is fired, the view will update
    - If there is a template associated with current route
        - Create a new scope
        - Remove the last view, which cleans up the last scope
        - Link the new scope and new template
        - Link the controller to the scope, if specified
        - Emits the '$viewContentLoaded' event
        - Run the `onLoad` attribute function, if provided

2. We should never use $apply in our code unless there is some changes happening outside Angular. Research more on why we have
   $apply when we use Parse service?
A: Parse services return a promise which is not an Angular promise. So the data is getting outside Angular and one otpion is we call
   $apply manually (or) we can retur promise from Angular service api and resolve based on success or failure. Please look at `parseservice.js`.
