const urlLab =
  'https://raw.githubusercontent.com/AdrianaEsvereidyTV/Proyecto-2-Laboratoria-Data-Dashboard/master/data/laboratoria.json';

// Función global para traer la data
window.onload = () => {
  fetch(urlLab)
    .then(response => response.json())
    .then(res => {
      const allData = computeStudentsStats(res);
      // paintCampus(allData);
      // paintGenerations(allData);
      paintSearch(allData);
      paintCampus(allData);
      // Argumento(invoca la función) para pasar el valor Lo recibe como response, pero se modifica para los test
    });
  // .catch((error) => {
  //  console.log(error);
  // })
};

window.getStats = (progress) => {
  let stats = {};
  let topicsArr = progress.temas;
  stats.completePercentage = progress.porcentajeCompletado;

  if (progress.porcentajeCompletado < 60) {
    stats.status = 'bajo rendimiento';
  }
  if (progress.porcentajeCompletado > 60 && progress.porcentajeCompletado < 90) {
    stats.status = 'medio rendimiento';
  } else {
    stats.status = 'alto rendimiento';
  }
  stats.topics = topicsArr;
  let properties = Object.values(progress.temas);

  properties.forEach(content => {
    content.completePercentage = content.porcentajeCompletado;
    content.percentageDuration = Math.round(
      (content.duracionTemaCompletado * 100) / content.duracionTema
    );
    let subTopicsArr = content.subtemas;
    let subProperties = Object.values(subTopicsArr);
    subProperties.forEach(subContent => {
      subContent.type = subContent.tipo;
      subContent.duration = subContent.duracionSubtema;
      if (subContent.completado === 1) {
        subContent.completePercentage = 100;
      } else {
        subContent.completePercentage = 0;
      }
    });
  });
  return stats;
};
// Se nombra al parametro (la definen)
window.computeStudentsStats = (laboratoria) => {
  // Se crean estás variables para crear el objeto con las propiedas
  // se crea una variable let de sedes
  let studentArr = [];
  let i = 0;
  // se usa un método para traer el nombre de las propiedades nos trae un arreglo{de objeto}
  let campus = Object.keys(laboratoria);
  // console.log(campus)
  // se crea una variable let para traer y pedir los valores del objeto laboratoria
  let generationObjectArr = Object.values(laboratoria);
  // console.log(generationObjectArr);
  // Se define hasta donde se recorre en la data
  // component es una función callback para recorrer los niveles de la data, para iteraciones.
  generationObjectArr.forEach(component => {
    // console.log(component)
    // Va a dar  el valor del objeto component a un arreglo con los nombres de las sedes (campus)
    let allGenerations = Object.keys(component.generacion);
    // console.log(allGenerations);
    let byGenerationContent = Object.values(component.generacion);
    // console.log(byGenerationContent);
    j = 0;
    byGenerationContent.forEach(student => {
      let students = student.estudiantes;
      students.forEach(allInfoStudent => {
        let stats = getStats(allInfoStudent.progreso);
        studentArr.push({
          campus: campus[i],
          generations: allGenerations[j],
          name: allInfoStudent.nombre,
          email: allInfoStudent.correo,
          turn: allInfoStudent.turno,
          stats: stats
        });
      });
      j++; // se va a recorrer uno a uno para recorrer uno a uno la información dentro de generación
    });
    i++; // va a recorrer uno a uno la información de las sedes
  });
  // console.log(studentArr);
  return studentArr;
};

window.filterStudents = (students, search) => {
  let searchResult = [];
  students.forEach(resElement => {
    if (resElement.name.indexOf(search) !== -1) {
      searchResult.push(resElement);
    }
  });
  return searchResult;
};

window.filterItereitorCampus = (students, search) => {
  let searchResult = [];
  students.forEach(resElement => {
    if (resElement.campus === search) {
      searchResult.push(resElement);
    }
  });
  return searchResult;
};

window.filterItereitorGenerations = (students, search) => {
  let searchResult = [];
  students.forEach(resElement => {
    if (resElement.generations === search) {
      searchResult.push(resElement);
    }
  });
  // console.log(searchResult);
  return searchResult;
};
