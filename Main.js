
import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getUsers } from './apis';
import Table from './Table';
import SearchBar from './SearchBar';

const styles = {
  contentSection: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: 8
  },
  headerSection: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: 8
  }
}

const MainPage = ({ classes }) => {
 
  const [user, setUser] = useState([]);
  const [filter, setFilter] = useState('');
  const [getFilteredUser, setFilteredUser] = useState([]);
  const [nameFilter, setNameFilter] = useState('all');
  const [descriptionFilter, setDescriptionFilter] = useState('all');

  useEffect(() => {
    getUsers().then(data => {
      const sortData = data.sort((a, b) => (a.name > b.name) ? 1 : -1)
      setUser(sortData);
      setFilteredUser(sortData);
    });
  }, []);

  useEffect(() => {
    let filteredUser = filterDataByName(user);
    filteredUser = filterDataByDescription(filteredUser);
    setFilteredUser(filteredUser);
  }, [nameFilter, descriptionFilter]);

  const filterDataByName = data => {
    if (nameFilter !== 'all') {
      return data.filter(row => row.name.includes(nameFilter));
    }
    return data;
  }

  const filterDataByDescription = data => {
    if (descriptionFilter !== 'all') {
      return data.filter(row => row.description.includes(descriptionFilter));
    }
    return data;
  }

  const headerOptions = [

    {
      id: "name",
    },
    {
      id: "description",
      
    },
    {
      id: "dateLastEdited"
    },
    ];


  


  const generateRow = row => {
    return (
      <tr key={row.id}>
        {headerOptions.map(field => (
          <td className={classes.contentSection}>
            {row[field.id]}
          </td>
        ))}
      </tr>
    )
  };

  const header = (
    <tr>
      {headerOptions.map(header => (
        <th className={classes.headerSection}>
          {header.id}
          {header.filterOptions && (
            <div>
              {header.filterOptions()}
            </div>
          )}
        </th>
      ))}
    </tr>
  );

  return (
    <div>
      <Table
        renderRow={row => generateRow(row)}
        setEntries = {setFilteredUser}
        entries={getFilteredUser}
        header={header}
        users = {user}
        placeholder="Search with Name and Description"
        textfilterOptions={['Name', 'Description', 'Date Last Edited']}
        pageLimit={10}
      />
    </div>
  )
}

export default withStyles(styles)(MainPage);
