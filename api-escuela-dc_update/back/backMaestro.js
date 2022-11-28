/**  Login maestro volátil  */

//#region Variables

credenciales = {}
var Registros = class {
    constructor(Matricula, contrasena){
        this.Matricula = Matricula;
        this.contrasena = contrasena; 
    }

    //Pueden ser agregados
    //getter
    //Método
}
var listaRegistro = [];

//#endregion

var usuario;
var contrasena;

//Variables de registro
var matricula_registro;
var contrasena_prim;
var contrasena_conf;

function readFormData() {
    var formData = {};

    usuario = formData["matricula_maestro"] = document.getElementById("matricula_maestro").value;
    contrasena = formData["contrasena_maestro"] = document.getElementById("contrasena_maestro").value;

    return formData

}

function readDataRegistro() {
    var Registro = {};

    matricula_registro = Registro["Maestro_registro_Nom"] = document.getElementById("Maestro_registro_Nom").value;
    contrasena_prim = Registro["contrasena_prim"] = document.getElementById("contrasena_prim").value;
    contrasena_conf = Registro["contrasena_conf"] = document.getElementById("contrasena_conf").value;

    return Registro
}

function resetForm() {
    document.getElementById("matricula_maestro").value = "";
    document.getElementById("contrasena_maestro").value = "";
    selectedRow = null;
}

function validate() {
    readFormData();
    isValid = true;
    if (usuario.value == "" && contrasena.value == "") {
        isValid = false;
        alert("Campos vacios");
    } else {
        isValid = true;
        window.location.replace('bienvenido.html');
        console.log("usuario: ", usuario);
        alert("Bienvenido : " + usuario);
    }
    return isValid;
}

function validateReg() {
    debugger;
    readDataRegistro();
    isValid = true;
    if (Maestro_registro_Nom.value == "" && contrasena_prim == "" && contrasena_conf == "") {
        isValid = false;
        alert("Campos vacios");
    } else {
       
        isValid = true;
        listaRegistro.push(new Registros(Maestro_registro_Nom.value, contrasena_prim))
        window.location.replace('bienvenido.html');
        console.log("usuario: ", Maestro_registro_Nom.value);
        alert("Bienvenido : " + listaRegistro[0].Matricula + "--" + listaRegistro[0].contrasena);

    }
    return isValid;
}