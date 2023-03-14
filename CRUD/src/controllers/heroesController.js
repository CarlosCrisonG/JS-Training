const fs = require('fs');
const path = require('path');

const heroesFilesPath = path.join(__dirname, '../data/heroes.json');

//Función para leer los heroes
function getHeroes () {
    return JSON.parse(fs.readFileSync(heroesFilesPath, 'utf-8'));
};

const controller = {
    // (get) Mostrar todos los heroes
    index: (req, res) => { //Muestra la página donde se listan los héroes
        const heroes = getHeroes();
        res.render('heroes/heroes', { heroes });
    },
    detail: (req, res) => { //Muestra la página donde se muestra el detalle de un héroe
        const id = req.params.id;
        const heroes = getHeroes();
        const heroe = heroes.find(heroe => heroe.id == id);
        res.render('heroe/heroe', { heroe });
    },
    create: (req, res) => { //Muestra en formulario para crear un héroe
        res.render('heroe/heroeFormCreate');
    },
    store: (req, res) => { //Ejecuta la acción de crear un nuevo héroe
        const image = req.file ? req.file.filename : 'default-image.png';
        const heroes = getHeroes();
        const newHeroe = {
            id: heroes[heroes.length - 1].id + 1,
            nombre: req.body.name,
            bio: req.body.bio,
            img: image,
            aparicion: req.body.date,
            casa: req.body.casa
        }
        heroes.push(newHeroe);
        fs.writeFileSync(heroesFilesPath, JSON.stringify(heroes, null, ' '));
        res.redirect('/heroes');
    },
    edit: (req, res) => { //Muestra el formulario para editar un héroe
        const id = req.params.id;
        const heroes = getHeroes();
        const heroe = heroes.find(heroe => heroe.id == id);
        res.render('heroe/heroeFormEdit', { heroe });
    },
    update: (req, res) => { //Ejecuta la edición del heroe seleccionado.
        const id = req.params.id;
        const heroes = getHeroes();
        const heroeIndex = heroes.findIndex(heroe => heroe.id == id);
        const image = req.file ? req.file.filename : heroes[heroeIndex].img;
        heroes[heroeIndex] = {
            ...heroes[heroeIndex], 
            nombre: req.body.name,
            bio: req.body.bio,
            img: image,
            aparicion: req.body.date,
            casa: req.body.casa
        };
        fs.writeFileSync(heroesFilesPath, JSON.stringify(heroes, null, ' '));
        res.redirect('/heroes');
    },
    delete: (req, res) => { //Borra un heroe seleccionado.
        const id = req.params.id;
        const heroes = getHeroes();
        const heroeIndex = heroes.findIndex(heroe => heroe.id == id);
        heroes.splice(heroeIndex, 1);
        fs.writeFileSync(heroesFilesPath, JSON.stringify(heroes, null, ' '));
        res.redirect('/heroes');
    }
};

module.exports = controller;