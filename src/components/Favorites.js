import "./Favorites.css";
import { Box, Table, TableBody, TableCell, TableRow, IconButton } from '@mui/material';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';

export default function Favorites(props) {
  const {favorites, countries, removeFromFavoritesClick} = props

  const formattedCountry = (country) => {
    let formatted
    switch (country) {
      case "Italy":
        formatted = "Italian"
        break;
      case "England":
        formatted = "English"
        break;
      case "Netherlands":
        formatted = "Dutch"
        break;
      case "Scotland":
        formatted = "Scottish"
        break;
      case "Portugal":
        formatted = "Portuguese"
        break;
      case "Belgium":
        formatted = "Belgian"
        break;
      case "Germany":
        formatted = "German"
        break;
      case "Spain":
        formatted = "Spanish"
        break;
      case "Czech Republic":
        formatted = "Czech"
        break;
      case "France":
        formatted = "French"
        break;
      case "Austria":
        formatted = "Austrian"
        break;
      case "Croatia":
        formatted = "Croatian"
        break;
      case "Ukraine":
        formatted = "Ukrainian"
        break;
      case "Denmark":
        formatted = "Danish"
        break;
      case "Israel":
        formatted = "Israeli"
        break;
      default:

    }
    return formatted
  }

  return (
    <Box className="popper-wrapper">
      {!favorites.length < 1 ? (
        <div>
          <div className="popper-flexbox">
            {favorites.map(favorite => 
              <div className = "favorite-container">
                <div className="favorite-team-container-row">
                  <div className="favorite-image">
                    <img src={favorite.image} href="Team Logo" width="35" height="35"></img>
                  </div>
                  <div className="favorite-team-container-column">
                    <div className="favorite-name-wrapper">
                      <div className="favorite-name">
                        {favorite.name}
                      </div>        
                      <div className="remove-favorite-button">
                          <IconButton color="primary" onClick={() => removeFromFavoritesClick(favorite)}>
                            <BookmarkRemoveIcon sx={{ fontSize: 20 }}/>
                          </IconButton>
                      </div>
                    </div>
                    <div className="country-wrapper">
                      <div className="favorite-country">
                        {favorite.country}
                      </div>
                    </div>
                  </div>
                </div>

            </div>
              )}
              </div>
              <div className="count-name">Country Count:</div>
              <div className="country-count">
                <div className="count-outer">
                {Object.entries(countries).map(([country, count])=> 
                  <div className="count-inner">
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>{formattedCountry(country)}</TableCell>
                          <TableCell align="right" className="count-number">{count}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                )}
                </div>
              </div>
              </div>
      ): (
        <div>
          No teams yet added to your bookmarks.
        </div>
      )
      
      }
    </Box>
  )
}