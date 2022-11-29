import './App.css'
import clData from "./assets/champions-league-data.json"
import { useState, useEffect} from "react";
import TeamItem from "./components/TeamItem";
import Sidebar from "./components/Sidebar";
import Favorites from "./components/Favorites";
import StandingsView from "./components/StandingsView";
import {  Tabs, Tab, IconButton, Popper, Link, 
  FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PropTypes from 'prop-types';

// Makes image URLs work
clData.forEach(group => {
  group.teams.forEach(team => {
    team.image = process.env.PUBLIC_URL + "/" + team.logo
  })
})

function App() {

  const [tabView, setTabView] = useState("Standard View") // standard vs. standings
  const allCountries = ["England", "Spain", "Germany", "Italy", "France", "Portugal",
    "Netherlands", "Belgium", "Ukraine", "Croatia", "Denmark", "Scotland", "Austria",
    "Czech Republic", "Israel"] // all countries
  const allGroups = ["A", "B", "C", "D", "E", "F", "G", "H"] // all groups

  const [groupBy, setGroupBy] = useState("Group")
  const [qualifiedFilter, setQualifiedFilter] = useState("All")
  const [countryFilters, setCountryFilters] = useState(allCountries)
  const [groupFilters, setGroupFilters] = useState(allGroups)
  const [favoritesFilter, setFavoritesFilter] = useState("All")

  const [popperIsOpen, setPopperIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  // open popper 
  const handleFavoritesClick = (event) => {
    console.log(event.currentTarget)
    setAnchorEl(anchorEl ? null : event.currentTarget)
    setPopperIsOpen((previousOpen) => !previousOpen)
  }

  const [favorites, setFavorites] = useState([])
  const [countries, setCountries] = useState({})

  // when user adds a team to favorites
  const handleAddFavoritesClick = (name, image, country) => {
    let brk = false
    favorites.map(element => {
      if (element.name === name) brk = true
    })
    if (brk == true) return // if team already in favorites 
    let added = {
      name: name,
      image: image,
      country: country
    }
    let favs = favorites.slice() // copy
    favs.push(added) // add new team
    setFavorites(favs) // set favorites

    let cntries = {}
    Object.assign(cntries, countries)

    // update country count accordingly
    if (country in cntries) {
      cntries[country] += 1
    }
    else {
      cntries[country] = 1
    }

    // set state
    setCountries(cntries)
    setAnchorEl(document.getElementById("favorites-button"))
    setPopperIsOpen(true)
  }

  // update favorites and countries states
  const removeFromFavoritesClick = (favoriteItem) => {
    let favs = favorites.slice()
    favs.splice(favorites.indexOf(favoriteItem), 1)

    let cntries = {}
    Object.assign(cntries, countries)
    if (cntries[favoriteItem.country] == 1) delete cntries[favoriteItem.country]
    else cntries[favoriteItem.country] -= 1

    setFavorites(favs)
    setCountries(cntries)
  }

  // check if a team is in the favorites list
  const isInFavorites = (teamName) => {
    let inFavorites = false
    favorites.forEach(favorite => {
      if (favorite.name === teamName) inFavorites = true
    })
    return inFavorites
  }

  // define TabPanel (from MUI documentation)
  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        {...other}
      >
      {value === index && (
        <div className={tabView == "Standard View" ? "standard-view-panel" : "standings-view-panel"}>
           {children}
        </div>
       
      )}
      </div>
    )
  }

  // Define TabPanel prop types
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }

  // update tab view state
  const handleTabChange = (event, newValue) => {
    if (tabView != newValue) setTabView(newValue)
  }

  const [standings, setStandings] = useState({}) // standings dictionary

  // options for API fetch 
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '00376551famshade3161aee5d0c4p16d7e0jsn1c18eb918f1e',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  }

  // get groupId letter
  const intToChar = (int) => {
    const code = 'A'.charCodeAt(0);  
    return String.fromCharCode(code + int);
  }

  // fetch api once
  useEffect(() => {
    const fetchStandings = async () => {
      return fetch('https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=2', options)
        .then(data => data.json()).then(response => {
          response.response.map(element => {
    
            const resStandings = element.league.standings
            resStandings.map((groups, index) => {
              let teams = []
              let groupId = intToChar(index)
              // get relevant info
              groups.map(clGroup => {
                teams.push(
                  {
                    rank: clGroup.rank, 
                    teamName: clGroup.team.name, 
                    logo: clGroup.team.logo, 
                    points: clGroup.points,
                    goalsDiff: clGroup.goalsDiff,
                    form: clGroup.form,
                    played: clGroup.all.played,
                    win: clGroup.all.win, 
                    draw: clGroup.all.draw,
                    lose: clGroup.all.lose
                  }
                )
              })
              standings[groupId] = teams // add to standings dict
            })
    
          })
          setStandings(standings) // update standings
        }).catch(e=>console.log(e))
    }
    fetchStandings() 
  }, [])

  return (
    <div className="App">
    <div className="page" >
      <header className="App-header">
        UCL Group Stage App 
        <Link href="https://www.uefa.com/uefachampionsleague/">
          <img src="images/uclLogo.png" className="App-logo" alt="logo" />
        </Link>
      </header>
    <div className="main-view">
      <div className="header">
        <div className="tabs">
          <Tabs
            value = {tabView ==="Standard View" ? "Standard View" : "Standings View"}
            onChange={handleTabChange}
          >
            <Tab value="Standard View" label="Standard View"/>
            <Tab value="Standings View" label="Standings View"/>
          </Tabs>
        </div>
        <div className="tabs-select">
        <FormControl fullWidth>
          <InputLabel>View</InputLabel>
          <Select
            value={tabView ==="Standard View" ? "Standard View" : "Standings View"}
            label="View"
            onChange={(event)=> handleTabChange(event, event.target.value)}
          >
            <MenuItem value="Standard View">Standard View</MenuItem>
            <MenuItem value="Standings View">Standings View</MenuItem>
          </Select>
        </FormControl>
        </div>
        <div className="favorites-wrapper">
          <IconButton id="favorites-button" className="favorites-button" color="primary" onClick={handleFavoritesClick}>
            <BookmarksIcon sx={{ fontSize: 40 }}/>
          </IconButton>
        </div>
        <Popper id="popper" open={popperIsOpen} anchorEl={anchorEl} placement="bottom-end">
            <Favorites
              favorites = {favorites}
              countries = {countries}
              removeFromFavoritesClick = {removeFromFavoritesClick}
              >
            </Favorites>
        </Popper>
      </div>
      <TabPanel value={tabView} index="Standard View">
      <Sidebar 
        className = "sidebar"
        groupBy = {groupBy}
        setGroupBy = {setGroupBy}
        qualifiedFilter = {qualifiedFilter}
        setQualifiedFilter = {setQualifiedFilter}
        countryFilters = {countryFilters}
        setCountryFilters = {setCountryFilters}
        groupFilters = {groupFilters}
        setGroupFilters = {setGroupFilters}
        allCountries = {allCountries}
        allGroups = {allGroups}
        favoritesFilter = {favoritesFilter}
        setFavoritesFilter = {setFavoritesFilter}
        />
        {groupBy === "Group" &&
        <div className="specified-display">
        {groupFilters.map(groupId => 
        <div className="category-wrapper">
        <div className="category">
          <div className="group-name">
              <h1>Group {groupId}</h1>
          </div>
          {clData.map(group => 
            <div>
            {group.groupId === groupId && 
              <div>
              {group.teams.map(team => 
              <div>
              {countryFilters.includes(team.country) && 
                (qualifiedFilter === "All" || team.qualified == qualifiedFilter) &&
                (favoritesFilter === "All" || isInFavorites(team.name)) &&
                <div>
                <TeamItem 
                  name = {team.name}
                  group = {team.group}
                  country = {team.country}
                  qualified = {team.qualified}
                  image = {team.image}
                  groupBy={groupBy}
                  handleAddFavoritesClick = {handleAddFavoritesClick}
                  isInFavorites = {isInFavorites}
                />
              </div>
              }
              </div>
                  )}
              </div>
            }
            </div>
          )}
       </div>
       </div>
      )}
      </div>
      }
      {groupBy === "Country" &&
      <div className="specified-display">
        {countryFilters.map(country => 
          <div className="category-wrapper">
          <div className="category">
            <div className="country-name">
              <h1>{country}</h1>
            </div>
            {clData.map(group => 
              <div>
              {group.teams.map(team => 
              <div>
              {country === team.country && countryFilters.includes(team.country) && 
                (qualifiedFilter === "All" || team.qualified == qualifiedFilter) &&
                (favoritesFilter === "All" || isInFavorites(team.name)) &&
                <div>
                <TeamItem 
                  name = {team.name}
                  group = {team.group}
                  country = {team.country}
                  qualified = {team.qualified}
                  image = {team.image}
                  groupBy = {groupBy}
                  handleAddFavoritesClick = {handleAddFavoritesClick}
                  isInFavorites = {isInFavorites}
                />
              </div>
              }
              </div>
                  )}
              </div>
          )}
          </div>
          </div>
          )}
      </div>
      }
      </TabPanel>
      <TabPanel className="standings-view-panel" value={tabView} index="Standings View">
          <StandingsView className="standings-view"
            standings = {standings}
            />
      </TabPanel>
      
    </div>
    </div>
    </div>
  )
}


export default App;
