//Declaración de variables let para llamar los contenedores de la página en HTML

const paintStudents = allStudents => {
  // console.log(allStudents);

}

const paintSearch = allStudents => {
  document.getElementById('search').addEventListener('click', (event) => {
    event.preventDefault();
   const name = document.getElementById('name-to-search').value;
    if (name != '' && name != ' ') {
      const sedeLima = document.getElementById('campus-lima').value;
      const sedeMexico = document.getElementById('campus-mexico').value;
      const sedeSantiago = document.getElementById('campus-santiago').value;
      const searchResult = filterStudents(allStudents, name);
      //console.log(searchResult);
      let paintSearch = '';
      if (searchResult.length === 0) {
        document.getElementById('no-paint').innerHTML =
          `<p> No se encuentra en la búsqueda </p>
      `
      } else {
        searchResult.forEach((component, i) => {
          paintSearch += `<tr>
        <th scope="row"> ${[i+1]}</th>
        <td>${component.name}</td>
        <td>${component.campus}</td>
        <td>${component.generations}</td>
        <td>${component.email}</td>
        <td>${component.stats.completePercentage} % </td>
      </tr>`

        })

        document.getElementById('no-paint').innerHTML = '';
        document.getElementById('table-body').innerHTML = paintSearch;


      }
    }

  })
}
