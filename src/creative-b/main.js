// Se crea función para pintar en HTML

const paintSearch = (allData) => {
  document.getElementById('search').addEventListener('click', (event) => {
    const name = document.getElementById('name-to-search').value;
    const searchResult = filterStudents(allStudents, name);
    // console.log(searchResult);
    let paintSearch = '';
    if (searchResult.length === 0) {
      document.getElementById('no-paint').innerHTML =
        `<p> No se encuentra en la búsqueda </p>
      `;
    } else {
      searchResult.forEach((component, i) => {
        paintSearch += `<tr>
        <th scope="row"> ${[i + 1]}</th>
        <td>${component.name}</td>
        <td>${component.campus}</td>
        <td>${component.generations}</td>
        <td>${component.email}</td>
        <td>${component.stats.completePercentage} % </td>
      </tr>`;
      });
      document.getElementById('no-paint').innerHTML = '';
      document.getElementById('table-body').innerHTML = paintSearch;
    }
  });
};
