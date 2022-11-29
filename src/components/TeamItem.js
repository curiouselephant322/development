import "./TeamItem.css";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { IconButton, Tooltip } from '@mui/material';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

export default function TeamItem(props) {
  const {name, country, qualified, image, groupBy, 
    onMouseEnter, onMouseLeave, handleAddFavoritesClick, isInFavorites} = props

  const getFlagCode = (country) => {
    let countryCode
    switch (country) {
      case "Italy":
        countryCode = "IT"
        break;
      case "England":
        countryCode = "GB-ENG"
        break;
      case "Netherlands":
        countryCode = "NL"
        break;
      case "Scotland":
        countryCode = "GB-SCT"
        break;
      case "Portugal":
        countryCode = "PT"
        break;
      case "Belgium":
        countryCode = "BE"
        break;
      case "Germany":
        countryCode = "DE"
        break;
      case "Spain":
        countryCode = "ES"
        break;
      case "Czech Republic":
        countryCode = "CZ"
        break;
      case "France":
        countryCode = "FR"
        break;
      case "Austria":
        countryCode = "AT"
        break;
      case "Croatia":
        countryCode = "HR"
        break;
      case "Ukraine":
        countryCode = "UA"
        break;
      case "Denmark":
        countryCode = "DK"
        break;
      case "Israel":
        countryCode = "IL"
        break;
      default:

    }
    return countryCode
  }

  return ( 
        <div className="team-item-wrapper">
            <div className="team-item">
              <div>
                <Tooltip disableFocusListener disableTouchListener title={qualified === "Qualified" ? "Qualified for the knockout stage" : "Not qualified"}>
                  <div className="qualified" style={{backgroundColor: qualified === "Qualified" ? "green" : "white"}}>
                  </div>
                </Tooltip>
              </div>
              <div className="image-wrapper">
                <img src={image} href="Team Logo" width="45" height="45"></img>
              </div>
              <div className={groupBy === "Country" ? "country-team-info" : "team-info"}>
                <div className="team-wrapper">
                  <div 
                    className="team-name" 
                    style={{fontWeight: groupBy === "Country" ? "normal" : "bold"}}>
                      {name}
                  </div>
                  {isInFavorites(name) && 
                        <BookmarkAddedIcon className="bookmark-added-icon"/>
                      }
                  <div className="add-favorites-wrapper">
                    <IconButton value={[name, image]}color="primary" onClick={() => handleAddFavoritesClick(name, image, country)}>
                      <BookmarkAddIcon sx={{ fontSize: 32 }}/>
                    </IconButton>
                  </div> 
                </div>
                  {(groupBy === "Group" || groupBy === "None") && 
                    <div className="country-of-team">
                      {country}
                    </div>
                  }      
                  <div>
                </div>
              </div>

            </div>
        </div>
  )
} 
