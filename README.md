### Travel Tracker

#### Abstract
This is the final solo project from Mod 2 at Turing School of Software and Design. This program focuses on using Object-oriented programming (OOP) to perform data manipulation and test-driven development (TDD) to implement a robust testing suite. We were given a spec detailing a travel app that can be used by logging in as a traveler or an agency. Travelers can log in with the username "traveler" followed by their ID (1-50). For example, "traveler19". The username for an agency is "agency." The password for all users is "travel2020."

When a traveler logs in, they can view their user stats, annual travel expenses, a current trip, upcoming trips, pending trips, and past trips. They can also complete a form to book a trip. An agency has a similar dashboard, but they see their yearly revenue, number of travelers today, and pending trips, which they can approve or deny. They also have a form where they can search for a traveler by name and see stats about that traveler. If the traveler they select has pending trips, the agent can also approve or deny those trips from that widget. The dashboard will update when a traveler requests a trip (adds it to their pending and upcoming trips) or when an agency approves/denies a request. Any changes are updated automatically in the database via fetch.

#### Contributors

[Cristina Peña](https://github.com/CLPena)

#### In Action
![Gif of app](https://i.imgur.com/Xizmyo2.gifv)

#### Project Next Steps
I would love to further finesse the layout of this to be a truer masonry layout. Though there are breakpoints to accommodate different screen sizes, I'd like to refine them even further to eliminate awkward in-between spots. I would also like to add more visual interest, like icons in the widgets and viewable photos of destinations.

#### Setup
Fork and clone down this repo.
Once you have cloned the repo, change into the directory.
To view the application, run npm and open the provided localhost url in the browser.
