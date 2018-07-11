const paintCampus = (allData) => {
  document.getElementById('view').addEventListener('click', (event) => {
    const campus = document.getElementById('select-campus').value;
    const generations = document.getElementById('select-generation').value;

    const searchResult = filterItereitorCampus(allData, campus);
    const searchResultGeneration = filterItereitorGenerations(searchResult, generations);
    // console.log(searchResultGeneration);
    // console.log(searchResultGeneration);
    let paintSearchCampus = '';
    if (searchResultGeneration.length === 0) {
      document.getElementById('no-paint').innerHTML =
        `<p> No se encuentra en la búsqueda </p>
    `;
    } else {
      searchResultGeneration.forEach((component, i) => {
        paintSearchCampus += `<tr>
        <th scope="row"> ${i + 1}</th>
        <td>${component.name}</td>
        <td>${component.campus}</td>
        <td>${component.generations}</td>
        <td>${component.email}</td>
        <td>${component.stats.completePercentage} % </td>
      </tr>`;
      });
      document.getElementById('no-paint').innerHTML = '';
      document.getElementById('table-body').innerHTML = paintSearchCampus;
    }
  });
};

