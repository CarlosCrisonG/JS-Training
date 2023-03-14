const controller = {
    home: (req, res) => { //Muestra la página principal
        res.render('home/home');
    },
    about: (req, res) => { //Muestra la página about
        res.render('about/about');
    } 
};

module.exports = controller;