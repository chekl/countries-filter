let displayedItems = [];
let sortFlags = {
    name: 'ascending',
    area: 'ascending',
};
let initial = true;

const appRoot = document.getElementById('app-root');
const body = document.getElementsByTagName('body')[0];

body.innerHTML = `
<h1>Countries Search</h1>
<div class="container">
    <div class="filters">
        <div class="filter-picker">
            <p>Please choose type of search</p>
            <input type="radio" id="regionSearch" value="region" name="search" onclick="handleChicker(value)" />
            <label for="regionSearch">By Region</label>
            <br />
            <input
                type="radio"
                id="languageSearch"
                value="language"
                name="search"
                onclick="handleChicker(value)"
            />
            <label for="languageSearch">By Language</label>
            <br />
        </div>
        <div class="language-picker">
            <p>Please choose search query</p>
            <select name="" id="searchQuery" disabled onchange="renderTable(this)">
                <option value="" disabled selected>Please Choose...</option>
            </select>
        </div>
    </div>
    <table id="table">
        <p  id="no-items">No items, please choose search query</p>
    </table>
</div>
`;

let tableHeaders = '';
const generateHeader = () => {
    tableHeaders = `<tr>
    <th><p>Country Name <span style="cursor:pointer" onClick = "sortDependOnArrow(this)" id="name">${
        sortFlags.name === 'ascending' ? '&#8593;' : '&#8595;'
    }</span></p></th>
    <th>Capital</th>
    <th>World Region</th>
    <th>Languages</th>
    <th>Area <span style="cursor:pointer" onClick = "sortDependOnArrow(this)" id="area">${
        sortFlags.area === 'ascending' ? '&#8593;' : '&#8595;'
    }</span></th>
    <th>Flag</th>
  </tr>`;
};

function handleChicker(value) {
    if (initial) {
        initial = false;
        document.getElementById('no-items').remove();
    }
    const optionsList = document.getElementById('searchQuery');
    optionsList.name = value;
    value === 'language'
        ? insertOptions(externalService.getLanguagesList())
        : insertOptions(externalService.getRegionsList());

    function insertOptions(optionArr) {
        let fragment = document.createDocumentFragment();
        optionArr.forEach((language) => {
            let option = document.createElement('option');
            option.textContent = language;
            option.value = language;
            fragment.appendChild(option);
        });

        while (optionsList.lastElementChild) {
            optionsList.removeChild(optionsList.lastElementChild);
        }

        optionsList.appendChild(fragment);
        optionsList.disabled = false;
    }
}

function renderTable(items) {
    const optionsList = document.getElementById('searchQuery');

    optionsList.name === 'language'
        ? renderItems(externalService.getCountryListByLanguage(items.value))
        : renderItems(externalService.getCountryListByRegion(items.value));
}

function renderItems(tableItemsArr) {
    displayedItems = tableItemsArr;
    const table = document.getElementById('table');
    const fragment = document.createDocumentFragment();
    displayedItems.forEach((item) => {
        let tableRow = document.createElement('tr');

        let tableRowCountry = document.createElement('td');
        tableRowCountry.textContent = item.name;

        let tableRowCapital = document.createElement('td');
        tableRowCapital.textContent = item.capital;

        let tableRowRegion = document.createElement('td');
        tableRowRegion.textContent = item.region;

        let tableRowLanguages = document.createElement('td');
        tableRowLanguages.textContent = Object.values(item.languages).reduce((acc, currentValue) => {
            return acc + ', ' + currentValue;
        });

        let tableRowArea = document.createElement('td');
        tableRowArea.textContent = item.area;

        let tableRowFlag = document.createElement('td');
        let flagImage = document.createElement('img');
        flagImage.src = item.flagURL;
        tableRowFlag.appendChild(flagImage);

        tableRow.append(
            tableRowCountry,
            tableRowCapital,
            tableRowRegion,
            tableRowLanguages,
            tableRowArea,
            tableRowFlag
        );
        fragment.appendChild(tableRow);
    });
    while (table.lastElementChild) {
        table.removeChild(table.lastElementChild);
    }
    generateHeader();
    table.innerHTML = tableHeaders;
    table.appendChild(fragment);
}

function sortDependOnArrow(element) {
    const MINUS_ONE = -1;
    sort(element.id);
    function sort(fieldName) {
        if (sortFlags[element.id] === 'ascending') {
            sortFlags[element.id] = 'descending';
            displayedItems = displayedItems.sort((a, b) => {
                if (a[fieldName] > b[fieldName]) {
                    return 1;
                } else if (a[fieldName] === b[fieldName]) {
                    return 0;
                } else {
                    return MINUS_ONE;
                }
            });
        } else {
            sortFlags[element.id] = 'ascending';
            displayedItems = displayedItems.sort((a, b) => {
                if (a[fieldName] > b[fieldName]) {
                    return MINUS_ONE;
                } else if (a[fieldName] === b[fieldName]) {
                    return 0;
                } else {
                    return 1;
                }
            });
        }
    }
    renderItems(displayedItems);
}