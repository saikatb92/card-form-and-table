const API = 'https://raw.githubusercontent.com/epsilon-ux/code-challenge-resources/main/cookies.json';

const tableBody = document.getElementById('table-body');

let dataArray = [];

let SORT_STATES = {
  UNSORTED: 0,
  ASCENDING: 1,
  DESCENDING: 2
}

let COL_SORT_STATES = {
  name: SORT_STATES.UNSORTED,
  price: SORT_STATES.UNSORTED,
  category: SORT_STATES.UNSORTED
}

const populateDataArray = (data) => {
    dataArray = [...data];
}

const modifyTableHeader = () => {
  const colKeys = Object.keys(COL_SORT_STATES);

  for(let i = 0; i < colKeys.length; i++) {
    const head = document.getElementById(colKeys[i]);

    if(COL_SORT_STATES[colKeys[i]] === SORT_STATES.UNSORTED) {
      head.classList.remove('ascending');
      head.classList.remove('descending');
    } else if(COL_SORT_STATES[colKeys[i]] === SORT_STATES.ASCENDING) {
       head.classList.remove('descending');
       head.classList.add('ascending');
    } else {
       head.classList.remove('ascending');
       head.classList.add('descending');
    }
  }
}

const renderTable = (dataArray) => {
  modifyTableHeader();
  let innerHTMLString = '';
  dataArray.forEach(element => {
      innerHTMLString += `<tr>
       <td>
         ${element.name}
       </td>
       <td>
         ${element.price}
       </td>
       <td>
         ${element.category}
       </td>
      </tr>`
  });

  tableBody.innerHTML = innerHTMLString;
}



// Sorting functionalities
const setSortState = (col) => {
  const colKeys = Object.keys(COL_SORT_STATES);

  for(let i = 0; i < colKeys.length; i++) {
    if(colKeys[i] === col) {
      if(COL_SORT_STATES[colKeys[i]] === SORT_STATES.UNSORTED) {
        COL_SORT_STATES[colKeys[i]] = SORT_STATES.ASCENDING;
      } else if(COL_SORT_STATES[colKeys[i]] === SORT_STATES.ASCENDING) {
        COL_SORT_STATES[colKeys[i]] = SORT_STATES.DESCENDING;
      } else {
        COL_SORT_STATES[colKeys[i]] = SORT_STATES.ASCENDING;
      }
    } else {
      COL_SORT_STATES[colKeys[i]] = SORT_STATES.UNSORTED;
    }
  }
}

const sortByName = () => {
  setSortState('name');
  if(COL_SORT_STATES['name'] === SORT_STATES.ASCENDING) {
    dataArray.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    dataArray.sort((a, b) => b.name.localeCompare(a.name));
  }
   
   renderTable(dataArray);
}

const sortByPrice = () => {
  setSortState('price');
   dataArray.sort((a, b) => {
     const aInNumber = parseFloat(a.price.slice(1, a.price.length));
     const bInNumber = parseFloat(b.price.slice(1, b.price.length));
     if(COL_SORT_STATES['price'] === SORT_STATES.ASCENDING) {
       return aInNumber - bInNumber;
     } else {
       return bInNumber - aInNumber;
     }
     
    });
   renderTable(dataArray);
}

const sortByCategory = () => {
  setSortState('category');
  if(COL_SORT_STATES['category'] === SORT_STATES.ASCENDING) {
    dataArray.sort((a, b) => a.category.localeCompare(b.category));
  }
  else {
    dataArray.sort((a, b) => b.category.localeCompare(a.category));
  } 
   renderTable(dataArray);
}


// API call and initial table rendering
const fetchAndPopulateTable = (api) => {
   fetch(api).then(res => res.json()).then(data => {
       populateDataArray(data.cookies);
       renderTable(dataArray);
   })
}


fetchAndPopulateTable(API);