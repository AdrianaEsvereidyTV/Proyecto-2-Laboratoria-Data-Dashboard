const urlLab =
  "https://raw.githubusercontent.com/AdrianaTV/Proyecto-2--Laboratoria-Data-Dashboard/master/data/laboratoria.json";

// Función global para traer
window.urlData = () => {
  fetch(urlLab)
    .then(response => response.json())
    .then(response => {

      const allStudents = computeStudentsStats(response);
      paintStudents(allStudents);
      paintSearch(allStudents);

      //Argumento(invoca la función) para pasar el valorLo recibe como response, pero se modifica para los test
    });
  //.catch((error) => {
  //  console.log(error);
  //})
};

window.getStats = progress => {
  //console.log(progress);

  let stats = {};
  let topicsArr = progress.temas;
  //console.log(topicsArr);

  stats.completePercentage = progress.porcentajeCompletado;
  //console.log(stats);
  if (progress.porcentajeCompletado < 60) {
    stats.status = "bajo rendimiento";
    //console.log(stats);
  }
  if (
    progress.porcentajeCompletado > 60 &&
    progress.porcentajeCompletado < 90
  ) {
    stats.status = "medio rendimiento";
  } else {
    stats.status = "alto rendimiento";
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
//Se nombra al parametro (la definen)
window.computeStudentsStats = laboratoria => {
  //Se crean estás variables para crear el objeto con las propiedas
  // se crea una variable let de sedes
  let studentArr = [];
  let campus = "";
  // se crea una variable let de para el nombre de las propiedades
  let generationObjectArr = "";
  // se crea una variable let para traer
  let allGenerations = "";
  let byGenerationContent = "";

  let students = "";
  let i = 0;

  // se usa un métpdp para traer el nombre de las propiedades nos trae un arreglo{}
  campus = Object.keys(laboratoria);
  //console.log(sedes)
  // Para pedir los valores del objeto laboratoria
  generationObjectArr = Object.values(laboratoria);
  //console.log(generationObjectArr);

  //Se define hasta donde se recorre en la data
  // component es una función callback para recorrer los niveles de la data, para iteraciones.
  generationObjectArr.forEach(component => {
    //console.log(component)

    // Va a dar  el valor del objeto component a un arreglo con los nombres de las sedes
    allGenerations = Object.keys(component.generacion);
    //console.log(allGenerations);
    byGenerationContent = Object.values(component.generacion);
    //console.log(byGenerationContent);
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
  //console.log(studentArr);
  return studentArr;
};

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
    })

  }
  return generationsArray;

}

window.sortStudents = (students, orderBy, orderDirection) => {


}
window.filterCampus = (student,search) => {
  let searchResult= [];
  console.log(student);
  student.forEach(element => {
      //console.log(element);
      if(element.campus === search){
          searchResult.push(element);
      }

  })
  //console.log(element);
  return searchResult;
}

window.filterStudents = (students, search) => {
  let searchResult = [];
  students.forEach(resElement => {
    if (resElement.name.indexOf(search) != -1) {
      searchResult.push(resElement);

    }
  })
  return searchResult;

}
