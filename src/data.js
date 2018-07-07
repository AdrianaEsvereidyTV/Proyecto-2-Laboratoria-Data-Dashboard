const urlLab = "https://raw.githubusercontent.com/AdrianaTV/Proyecto-2--Laboratoria-Data-Dashboard/master/data/laboratoria.json";

// Función global para traer
window.urlData = () => {
  fetch(urlLab)
    .then(response => response.json())
    .then(response => {
      //console.log(response)
      computeStudentsStats(response);
      //Argumento(invoca la función) para pasar el valorLo recibe como response, pero se modifica para los test
    })
  //.catch((error) => {
  //  console.log(error);
  //})
}

window.getStats = (progress) => {
     //console.log(progress);
    let stats = [];

    stats.completePercentage = progress.porcentajeCompletado;
     //console.log(stats);
     if(progress.porcentajeCompletado < 60){
       stats.status = 'bajo rendimiento';
       console.log(stats);
     }
     if(progress.porcentajeCompletado > 60 && progress.porcentajeCompletado < 90){
       stats.status = 'medio rendimiento';

     }
     else{
       stats.status = 'alto rendimiento';
      }
     console.log(stats)

}
//Se nombra al parametro (la definen)
window.computeStudentsStats = (laboratoria) => {
     //console.log(laboratoria)
     //Se crean estás variables para crear el objeto con las propiedas
     // se crea una variable let de sedes
   let campus = '';
      // se crea una variable let de para el nombre de las propiedades
   let generationObjectArr = '';
     // se crea una variable let para traer
   let allGenerations = '';
   let byGenerationContent = '';

   let students = '';

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
      allGenerations = Object.keys(component.generacion)
       //console.log(allGenerations);
      byGenerationContent = Object.values(component.generacion);
        //console.log(byGenerationContent);
      byGenerationContent.forEach(student => {
        students = student.estudiantes;
         //console.log(student.estudiantes);
         students.forEach(allInfoStudent =>{
            //console.log(allInfoStudent);
           let stats = getStats(allInfoStudent.progreso)


        })
      })
    })
}

