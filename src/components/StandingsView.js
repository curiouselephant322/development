import "./StandingsView.css";
import { useState, useCallback, useEffect} from "react";
import { Box, Table, TableContainer, TableHead, TableBody,  TableRow, Popper} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Favorites from "./Favorites";
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';


export default function StandingsView(props) {

  const {standings} = props

  const sxHead={fontSize:"15px", fontWeight: "600"}
  const sxBody={fontSize: "18px"}

  const formatForm = (form) => {
    let formattedForm = []
    for (var i=0; i<form.length; i++) {
      formattedForm.push(form[i])
    }
    return formattedForm
  }

  return (
    <div>
      {Object.entries(standings).map(([group, teams]) =>
          <div>
            <div className="table-group-name">
              Group {group}
            </div>
          <TableContainer className="table-container">
            <Table className="table" sx={{ minWidth: 500, fontSize: "1.2em" }}>
              <TableHead>
                <TableRow className="table-row">
                  <TableCell sx={sxHead} className="table-left-cell">Club</TableCell>
                  <TableCell className="toggled-cell" sx={sxHead} align="right">MP</TableCell>
                  <TableCell className="toggled-cell" sx={sxHead} align="right">W</TableCell>
                  <TableCell className="toggled-cell" sx={sxHead} align="right">D</TableCell>
                  <TableCell className="toggled-cell" sx={sxHead} align="right">L</TableCell>
                  <TableCell className="toggled-cell" sx={sxHead} align="right">GD</TableCell>
                  <TableCell className="pts" sx={sxHead} align="right">Pts</TableCell>
                  <TableCell className="form-cell toggled-cell" sx={sxHead} align="right">Last Five</TableCell>
                </TableRow>
              </TableHead>
                {teams.map(team => 
                  <TableBody>
                  <TableRow className="table-row">
                    <TableCell className="table-left-cell" sx={sxBody}>
                      <div className="standings-team-flex">
                        <div style={{fontSize: "15px"}}>{team.rank}</div>                  
                          <img src={team.logo} alt="team logo" width="30" height="30"/>
                        <div><b></b>{team.teamName}</div>
                      </div>
                    </TableCell>
                    <TableCell className="toggled-cell" sx={sxBody} align="right">{team.played}</TableCell>
                    <TableCell className="toggled-cell" sx={sxBody} align="right">{team.win}</TableCell>
                    <TableCell className="toggled-cell" sx={sxBody} align="right">{team.draw}</TableCell>
                    <TableCell className="toggled-cell" sx={sxBody} align="right">{team.lose}</TableCell>
                    <TableCell className="toggled-cell" sx={sxBody} align="right">{team.goalsDiff}</TableCell>
                    <TableCell  className="pts" sx={sxBody} align="right">{team.points}</TableCell>
                    <TableCell className="form-cell toggled-cell" sx={sxBody} align="right">
                    <div className="recent-form-wrapper">
                      {formatForm(team.form).map(result =>   
                          <div className="result-wrapper" style={{backgroundColor: (result === "W" ? "green": "red")}}>
                            <div className="result">
                            {result}
                            </div>
                          </div>                     
                        )}
                      </div>
                    </TableCell>
                </TableRow>
                </TableBody>
                )}
          </Table>
        </TableContainer>
        </div>
      )}
    
    </div>
  )

}