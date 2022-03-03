
export const getUsers = () => {
    return new Promise(resolve => {
      fetch('mockData.json',{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
        }).then(res => res.json())
        .then(data => resolve(data));
    });
  }
