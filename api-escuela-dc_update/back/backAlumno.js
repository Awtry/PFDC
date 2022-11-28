var alumnos = []
alumnos[0] = ["00070306", "Alan", "Marvin", "Guzmán", "Flores", "ISSC", "7", "711", 'H'];
alumnos[1] = ["00070624", "Diana", "","Bojorquez", "Soto", "ISSC", "7", "711", 'M'];
alumnos[2] = ["00070362", "Jorge", "Ismael","Vera", "Huerta", "ISSC", "7", "711",'H'];
Genero = ""

    console.log(alumnos)
    lista = document.querySelector(`#TablaIterada`);
    //else if (alumnos[i][8] != 'H' && alumnos[i][8] != 'M') {Poner ruta de la foto subida}
    for(i = 0; i<alumnos.length; i++) 
    {
        for(j = 0; j<5; j++)
        {
            if(alumnos[i][8] == 'H') {
                Genero = "../icons/MaleUser.png"
            } else {
                Genero = "../icons/FemaleUser.png"
            }
            lista.innerHTML += `<tr id="TablaAlumnoTR"><th scope="row"> <h2 style="text-align: center; font-weight: bold;">${i+1}</h2></th><td><div class="col" id="IconoContenedor"><img src="${Genero}" height="70px" width="70px"></div></td>
        <td style="text-align: center;">
        <label id="cajaTexto">${alumnos[i][j]}</label>
        </td>
        <td></td>
        <td style="text-align: center;"><label id="cajaTexto">${alumnos[i][++j]}</label></td>
        <td style="text-align: center;"><label id="cajaTexto">${alumnos[i][++j]}</label></td>
        <td style="text-align: center;"><label id="cajaTexto">${alumnos[i][++j]}</label></td>
        <td style="text-align: center;"><label id="cajaTexto">${alumnos[i][++j]}</label></td>
        <td></td>
        <td>
                                        <div class="col" id="IconoContenedor" onclick=printDatos(${alumnos[i][0]})>
                                            <button type="button" class="btn">
                                                <a >
                                                    <img
                                                    src="../icons/pencil.png" height="40px"
                                                    width="40px">
                                                </a>
                                                </button>
                                        </div>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>`
        }
    }

function printDatos(id) {
    console.log(id)
}


function getDatos() {

    alumnos.push([
        document.getElementById("MatrAlumno").value, 
        document.getElementById("NombreAlumno").value, 
        document.getElementById("APaternoAlumno").value, 
        document.getElementById("AMaternoAlumno").value, 
        document.getElementById("CarreraAlumno").value, 
        document.getElementById("SemestreAlumno").value, 
        document.getElementById("GrupoAlumno").value
    ])
    console.log(alumnos)
    debugger;
        for(j = 0; j<4; j++)
        {
            Genero = "../icons/MaleUser.png"
            lista.innerHTML += `<tr id="TablaAlumnoTR"><th scope="row"> <h2 style="text-align: center; font-weight: bold;">${alumnos.length}</h2></th><td><div class="col" id="IconoContenedor"><img src="${Genero}" height="70px" width="70px"></div></td>
        <td style="text-align: center;">
        <label id="cajaTexto">${alumnos[alumnos.length-1][j]}</label>
        </td>
        <td></td>
        <td style="text-align: center;"><label id="cajaTexto">${alumnos[alumnos.length-1][++j]}</label></td>
        <td style="text-align: center;"><label id="cajaTexto">${alumnos[alumnos.length-1][++j]}</label></td>
        <td style="text-align: center;"><label id="cajaTexto">${alumnos[alumnos.length-1][++j]}</label></td>
        <td style="text-align: center;"><label id="cajaTexto">${alumnos[alumnos.length-1][++j]}</label></td>
        <td></td>
        <td>
                                        <div class="col" id="IconoContenedor" onclick=printDatos()>
                                            <button type="button" class="btn">
                                                <a >
                                                    <img
                                                    src="../icons/pencil.png" height="40px"
                                                    width="40px">
                                                </a>
                                                </button>
                                        </div>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>`
        }
}

