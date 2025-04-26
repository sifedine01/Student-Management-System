let users = [];
let currentEditIndex = -1; 
window.onload = function() {
    const savedData = localStorage.getItem('studentCard');
    if (savedData) {
        users = JSON.parse(savedData);
        afficher(users);
    }
};
function saveToLocalStorage() {
    localStorage.setItem('studentCard', JSON.stringify(users));
}
document.getElementById("sec2").style.display = "none";
document.getElementById("sec3").style.display = "none";
                              
function goTOsec2() {
    document.getElementById("sec2").style.display = "block";
    document.getElementById("sec1").style.display = "none";
    document.getElementById("sec3").style.display = "none";
}

function goTOsec1() {
    document.getElementById("sec1").style.display = "flex";
    document.getElementById("sec2").style.display = "none";
    document.getElementById("sec3").style.display = "none";
}

function goTosec3() {
    document.getElementById("sec3").style.display = "block";
    document.getElementById("sec2").style.display = "none";
    document.getElementById("sec1").style.display = "none";
}

let specialites = [{
    id:'DD',
    spec:'Développement Digital'
},
{
    id:'UI',
    spec:'UI/UX'
},
{
    id:'ID',
    spec:'Infrastructure Digital'
},
{
    id:'IA',
    spec:'Intéligence Artificielle'
}
]

let text = '';
specialites.forEach((speci) => {
    text += `<li onclick="afficherSpe('${speci.id}')"><a href="">${speci.spec}</a></li>`;
    document.getElementById("nav").innerHTML = text;
});

function ajouter() {
    let nom = document.getElementById('nom').value;
    let prenom = document.getElementById('prenom').value;
    let genre = document.getElementById('genre').value.toLowerCase();
    let specialite = document.getElementById('specialite').value;
    let classe = document.getElementById('classe').value;
    let cc1 = parseFloat(document.getElementById('cc1').value) || 0;
    let cc2 = parseFloat(document.getElementById('cc2').value) || 0;
    let cc3 = parseFloat(document.getElementById('cc3').value) || 0;
    
    let user = {
        identite: { nom: nom, prenom: prenom, genre: genre },
        specialite: specialite,
        classe: classe,
        notes: { cc1: cc1, cc2: cc2, cc3: cc3 }
    };
    if (currentEditIndex === -1) {
        users.push(user);
    } else {
        users[currentEditIndex] = user;
        currentEditIndex = -1;
    }
    saveToLocalStorage();
    afficher(users);
    goTOsec1();
    document.getElementById('nom').value = '';
    document.getElementById('prenom').value = '';
    document.getElementById('genre').value = 'Genre';
    document.getElementById('specialite').value = 'Spécialité';
    document.getElementById('classe').value = '';
    document.getElementById('cc1').value = '';
    document.getElementById('cc2').value = '';
    document.getElementById('cc3').value = '';
}

function afficher(list) {
    let text1 = '';
    list.forEach((user, i) => {
        let moy = (user.notes.cc1 + user.notes.cc2 + user.notes.cc3) / 3;

        let UMorUW = user.identite.genre === "homme" ? "men.png" : "women.png";

        let CMorCW = user.identite.genre === "homme" ? "card-men" : "card-women";

        text1 += `
        <div class="${CMorCW}" id="${CMorCW}">
          <img onclick="delet(${i})" class="delet" src="./tp8_images_copy/delete.png" alt="img-supprimer">
          <img onclick="modify(${i})" class="modify" src="./tp8_images_copy/change.png" alt="img-modify">

          <div class="infos">
            <img class="user" src="./tp8_images_copy/${UMorUW}" alt="img-user">
            <div id="info">
                <p class="name">${user.identite.nom} ${user.identite.prenom}</p>
                <p>stagiare--${user.classe}</p>
                <p class="moy"><span class="index">${i+1}</span>Moyenne:${moy.toFixed(2)}</p>
            </div>
          </div>
        </div>`;
    });    
    document.getElementById('sec1').innerHTML = text1;
    goTOsec1();
}

function delet(i) {
    goTosec3();
    let text2=''
    text2 += `<img src="./tp8_images_copy/warning.png" alt="warning">
        <p>Voulez vous vraiment supprimer le stagiaire <span id="sec3-nom">${users[i].identite.nom} ${users[i].identite.prenom} ?</span>​</p>
        <button class="confirmer" onclick="confirmer(${i})">Confirmer</button>
        <button class="annuler" onclick="annuler()">Annuler</button>`
    document.getElementById('sec3').innerHTML = text2;
}

function modify(i) {
    document.getElementById('nom').value = users[i].identite.nom;
    document.getElementById('prenom').value = users[i].identite.prenom;
    document.getElementById('genre').value = users[i].identite.genre;
    document.getElementById('specialite').value = users[i].specialite;
    document.getElementById('classe').value = users[i].classe;
    document.getElementById('cc1').value = users[i].notes.cc1;
    document.getElementById('cc2').value = users[i].notes.cc2;
    document.getElementById('cc3').value = users[i].notes.cc3;
    
    currentEditIndex = i;

    goTOsec2()
}

function annuler(){
    goTOsec1();
}

function confirmer(i){
    users.splice(i, 1);
    saveToLocalStorage();
    afficher();
    goTOsec1();
}

function afficherSpe(id) {
    let newData1 = users.filter((user) => {
        return user.specialite === id;
    });

    afficher(newData1);
}
