// Variable const global para traer la data de Github
const urlLab = 'https://raw.githubusercontent.com/AdrianaEsvereidyTV/Proyecto-2-Laboratoria-Data-Dashboard/master/data/laboratoria.json';

// Función global para iterar con ella por el método fetch.
window.onload = () => {
  fetch(urlLab)
    .then(response => response.json())
    .then(res => {
      const allData = computeStudentsStats(res);
      /* Argumento invoca la función para pasar el valor Lo recibe como res, pero se modifica para los test*/
      paintSearch(allData);
      paintItereitorCampus(allData);
    })
    .catch(error => {
      // console.log(error);
    });
};

window.getStats = (progress) => {
  let stats = {};
  let topicsArr = progress.temas;
  stats.completePercentage = progress.porcentajeCompletado;
  if (progress.porcentajeCompletado < 60) {
    stats.status = 'bajo rendimiento';
  }
  if (
    progress.porcentajeCompletado > 60 &&
    progress.porcentajeCompletado < 90
  ) {
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

// Función en objeto window para poder manipular la data
window.computeStudentsStats = (laboratoria) => {
  // Se crean estás variables para crear el objeto con las propiedas
  let studentArr = [];
  let allGenerations = '';
  let byGenerationContent = '';
  let students = '';
  let i = 0;

  // se usa un métpdp para traer el nombre de las propiedades nos trae un arreglo{}
  let campus = Object.keys(laboratoria);
  // Para pedir los valores del objeto laboratoria
  let generationObjectArr = Object.values(laboratoria);
  // Se define hasta donde se recorre en la data
  // component es una función callback para recorrer los niveles de la data, para iteraciones.
  generationObjectArr.forEach(component => {
    // console.log(component)

    // Va a dar  el valor del objeto component a un arreglo con los nombres de las sedes
    allGenerations = Object.keys(component.generacion);
    byGenerationContent = Object.values(component.generacion);
    j = 0;
    byGenerationContent.forEach(student => {
      students = student.estudiantes;
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
      j++;
    });
    i++;
  });
  return studentArr;
};

// Función en window para interar en en arreglo que se desarrolla por generaciones
window.computeGenerationsStats = (laboratoria) => {
  const generationsArray = [];
  const obj = {
    campus: '',
    generation: '',
    average: 0,
    count: 0,
  };
  let average = 0;
  for (key in laboratoria) {
    obj.campus = key;
    average = 0;
    const generations = Object.keys(laboratoria[key].generacion);
    generations.forEach((generation) => {
      obj.generation = generation;
      const students = laboratoria[key].generacion[generation].estudiantes;
      for (student in students) {
        average += students[student].progreso.porcentajeCompletado;
        average = average / students.length;
        obj.average = average;
        obj.count = students.length;
        generationsArray.push(obj);
      }
    });
  }
  return generationsArray;
};

window.sortStudents = (students, orderBy, orderDirection) => {

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

