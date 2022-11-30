# Development

### Link to Deployed Website
https://curiouselephant322.github.io/development/

### Goal and Value of the Application

The goal of this application is to provide information on the UEFA Champions League (UCL) group stage fixtures from this season. For context, the UCL is the most prestigious club soccer competition in the world. In this app, you are able to see the teams from each group, the country the teams are based in, and the teams that are qualified for the following round. Using the filters and sorting options, a user might be able to get a better idea of the most successful countries, or the most difficult groups (if familiar with the teams), for example. One can add favorite teams to your bookmarks to save them. You can also switch to the standings view, which uses a football API to render the standings for the competition and give the user more specific information about the results in the group fixtures (wins, losses, goal differences, etc.). This app falls into a specific niche but provides a good overview of the UCL group stage from this year, and those interested in the UCL can use it as a reference point to remember relevant information about this stage of the competition.

### Usability Principles Considered

I tried to make the website easy to use. Indicative icons, such as the add to bookmarks icon, clearly show their purpose to the user. Moreover, when the add-to-bookmarks icon is clicked, the bookmarks popper opens up, making it clear to the user that something has been added to their favorites. This is based around the usability principle of keeping users informed about their actions. Consistency and standards are reflected in a consistent color and font scheme and consistent select menus throughout the app. The page also only contains information that is needed. For example, for the group and country filters, the only options that appear in the select dropdown are the ones not already chosen, as opposed to every single option (the default). This makes it easier for the user to understand which filters are and aren't selected and also declutters the dropdown menu.

### Organization of Components

The main App component contains the Sidebar, TeamItem, Favorites, and StandingsView components. The Sidebar component is for the sidebar on the left, with the filtering and sorting options. The TeamItem component represents a team and the information associated with that team, such as its country. Favorites is for content that appears in the bookmarks/favorites popover. This content is essentially the favorited team and the total country count below it. Finally, the StandingsView component is for the standings view panel, which shows the results from each group in standings format. 

### How Data is Passed Down Through Components

Data is passed down through components by using the data as props for a component. For example, the "favorites" state variable in App.js is passed down to the Favorites component as a prop; the Favorites component then uses this prop to iterate through and display each favorite. 

### How the User Triggers State Changes

Each button or select/dropdown box has an onClick or onChange property which when triggered calls a function that changes the value of a state variable using its setter function. The setter function updates the state variable based on the value obtained from the select/dropdown box. The add and remove bookmark buttons update the value of the favorites state variable accordingly with each click. 

