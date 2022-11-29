import "./Sidebar.css";
import { useCallback } from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { Select, InputLabel, MenuItem, Checkbox, Autocomplete, 
  TextField, Divider, ButtonGroup, Button, FormControl, Box, Chip} from '@mui/material'

export default function Sidebar(props) {

  const {groupBy, setGroupBy, qualifiedFilter, setQualifiedFilter,
          countryFilters, setCountryFilters, groupFilters, setGroupFilters, 
          allCountries, allGroups, favoritesFilter, setFavoritesFilter} = props

  // for select options
  const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>
  const checkedIcon = <CheckBoxIcon fontSize="small"/>

  const handleGroupByChange = (event) => {
    console.log(event.target.value)
    setGroupBy(event.target.value)
  }

  const handleQualifiedFilterChange = (event) => {
    setQualifiedFilter(event.target.value)
  }

  const handleFavoritesFilterChange = (event) => {
    setFavoritesFilter(event.target.value)
  }

  const handleCountryFilterChange = useCallback((event, values) => {
    console.log("Values: ", values)
    setCountryFilters(values)
  }, [setCountryFilters])

  const handleSelectAllGroups = () => {
    setGroupFilters(allGroups)
  }

  const handleSelectAllCountries = () => {
    setCountryFilters(allCountries)
  }

  const handleResetAllFilters = () => {
    setGroupFilters(allGroups)
    setCountryFilters(allCountries)
    setFavoritesFilter("All")
    setQualifiedFilter("All")
  }

  const handleGroupFilterChange = useCallback((event, values) => {
    values = values.sort()
    console.log(event)
    console.log("Group values: ", values)
    setGroupFilters(values)
  }, [setGroupFilters])

  // Tags for text in select box
  const getTagsText = (count, filterGroup) => {
    if (count !==15 && count !==8) return `${count} selected`
    else {
      if (filterGroup === "group") return "All 8 selected"
      else {
        if (filterGroup === "country" && count === 15) return "All 15 selected"
      }
    }
  }

  return ( 
        <div className="sidebar" id="sidebar">
          <div className="group-by-option">
          <FormControl fullWidth>
            <InputLabel sx={{ 
              fontSize:"16px", 
              }} 
              id="view">Group by:</InputLabel>
            <Select 
          
              className="select"
              labelId="group-by"
              onChange={handleGroupByChange}
              label="Group By"
              value={groupBy}
            >
              <MenuItem value="Group" selected>Group</MenuItem>
              <MenuItem value="Country">Country</MenuItem>
            </Select>
          </FormControl>
          <Divider id="filter-by-header">
            <Chip  style={{fontSize: "16px", fontWeight: "bold", color : "#1976d2", backgroundColor: "rgb(226, 226, 226)"}} label="FILTER BY" />
          </Divider>
          </div>

          <div className="filter-by-one">
            <ButtonGroup className="select-all-button-group">
                  <Button
                    onClick={handleSelectAllCountries}
                    sx={{fontSize:"11px", fontWeight: "bold", padding: "5px 5px"}}
                  >
                    Select All
                </Button>
            </ButtonGroup>
            <Autocomplete
              id="country-filter" 
              aria-label = "country-filter"
              value = {countryFilters}
              multiple
              filterSelectedOptions
              limitTags={0}
              getLimitTagsText = {(more)=> getTagsText(more, "country")}
              options = {allCountries}
              onChange = {handleCountryFilterChange}
              disableCloseOnSelect
              getOptionLabel={option => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Country" placeholder="Search" />
              )}
              />
          </div>
          <div className="filter-by-two">
            <ButtonGroup className="select-all-button-group">
                <Button
                  color="primary"
                  onClick={handleSelectAllGroups}
                  sx={{fontSize:"11px", fontWeight: "bold", padding: "5px 5px"}}
                >
                  Select All
                </Button>
            </ButtonGroup>
            <Autocomplete 
              id = "group-filter"
              value = {groupFilters}
              onChange = {handleGroupFilterChange}
              aria-label = "group-filter"
              multiple
              filterSelectedOptions
              limitTags={0}
              getLimitTagsText = {(more) => getTagsText(more, "group")}
              options = {allGroups}
              disableCloseOnSelect
              getOptionLabel={option => option}

              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox

                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Group" placeholder="Search" 
                sx={{fontSize: "0.8em"}}/>
              )}
              />
          </div>
          <div className="filter-by-three">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Qualified</InputLabel>
              <Select
                value={qualifiedFilter}
                label="Filter by Qualified"
                onChange={handleQualifiedFilterChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Qualified">Qualified</MenuItem>
                <MenuItem value="Not Qualified">Not qualified</MenuItem>
              </Select>
            </FormControl>
          </Box>
          </div>
          <div className="filter-by-four">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Favorites</InputLabel>
              <Select
                value={favoritesFilter}
                label="Filter by Favorites"
                onChange={handleFavoritesFilterChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Favorites">Favorites</MenuItem>
              </Select>
            </FormControl>
          </Box>
          </div>
          <div className="filter-by-five">
          <ButtonGroup className="reset-all-button-group">
                <Button
                  color="primary"
                  onClick={handleResetAllFilters}
                  sx={{fontSize:"13px", fontWeight: "700", padding: "8px 8px", 
                        backgroundColor: "rgb(226, 226, 226)"}}
                >
                  Reset All
                </Button>
            </ButtonGroup>
          </div>
        </div>   
    
  )
}
