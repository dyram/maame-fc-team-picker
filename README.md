# Maame FC - Team Picker

This app mimics a team picking solution locally known in Tamil Nadu as _"My Name-My Name_. I built this thing just to help me and my boys pick our Futsal teams in style.

App is still a WIP so feel free to PR improvements and fixes and I will review them.

---

## Working the picker

The _picker_ can be configured to your personal needs by modifying the _metadata_ conviniently located in the [data](https://github.com/dyram/team-picker/blob/master/src/data/metadata.json) folder of the app.

## Metadata

The _metadata_ consists of 5 fields,

_Hint : If you cannot understand this simple JSON, write a mail to **dyrammeyn@gmail.com**, get in touch and I will personally explain it to you._

1. **company** (datatype : String) : This field is used to specify the title that pops up in the middle of the navbar.
2. **teams** (datatype : Array(JSON)) : Specify the teams' details by modifying each team's respective JSON. The field names are pretty obvious. You will get it.
3. **players** (datatype : Array(JSON)) : This is the same as the team's JSON structure specifying the player's details. The _image_ field should be populated with the URL of an image that is hosted online.
4. **sequence** (datatype : Array(Integers)) : _This is an optional field_. This field can be used to specify the order in which the teams get to pick their player. Start the sequence with 0.

This is a CRA app so you need to have the following down in your system to run the development environment on your lap. They are,

1. **Node JS** & **Node Package Manager**, [Click on this link to know more](https://nodejs.org/en/download/).
2. **React**, [Click on this link to know more](https://reactjs.org/docs/create-a-new-react-app.html).

---

## Available Scripts

1. `yarn start` - Boots the app in development mode.
2. `yarn build` - Builds a production version of the app.
3. `yarn eject` - A one time operation to eject CRA completely.
4. `yarn test` - I dont know man, I haven't written any unit tests yet. Do it for me mates. Run script for fun.
