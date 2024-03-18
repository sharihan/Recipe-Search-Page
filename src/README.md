## Author
Sharihan Alnajjar

# Running this project
```
npm install # if using npm, to install dependencies
yarn # if using yarn, to install dependencies

npm run dev # if using npm, to start the development server
yarn dev # if using yarn, to start the development server
```

## Approach
To start, I downloaded the data from the API and stored it as JSON locally.  Then I designed the UI with this JSON imported, to set up the layout of the page.  Once I finished that, then I replaced it with the API call to me made once the component is mounted.

# Bonus
## Accessibility
Use ARIA attributes for providing screen readers with context
Keyboard Navigation currently works, but could be improved
Increasing color contrast

## Responsiveness
Adjust styles for different viewport sizes using media queries to cater to mobile, tablet, and desktop layouts.
Ensure that buttons and clickable items are large enough to be tapped on a mobile device.

## Handling URL Parameters
Use URLSearchParams to parse query parameters from the URL.
When the component mounts, parse the URL parameters and update the state accordingly.

