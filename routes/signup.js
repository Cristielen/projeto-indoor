const express = require('express');
const router = express.Router();
const isNull = require('../script').isNull;
const Database = require('../Database');
const Cryptr = require('cryptr');
const config = require('../config');
const cryptr = new Cryptr(config.security.key);


router.get('/', (req, res, next) => {
    res.render('signup', {
        message: ''
    });
});

router.post('/', (req, res, next) => {
    let nome = req.body.nome;
    let usuario = req.body.usuario;
    let senha = req.body.senha;
	let telefone = req.body.telefone;
	let endereco = req.body.endereco;
	let email = req.body.email;

    if (isNull(nome) || isNull(usuario) || isNull(senha) || isNull(telefone) || isNull(endereco) || isNull(email) {
        res.status(400).json({'error': 'Invalid nome, usuario and/or senha!'});
    }

    senha = cryptr.encrypt(senha);

    //console.log(`nome: ${nome}, usuario: ${usuario}, senha: ${senha}`);

    createUser(nome, usuario, senha).then(results => {
        req.session.message = `User ${usuario} created succesfully! Please log in...`;
        res.status(302).redirect('/login');
    }).catch(error => {
        res.render('signup', {message: "Error creating user.", error: error});
    });

});

function createUser(nome, usuario, senha) {
    return new Promise((resolve, reject) => {
        let create = undefined;
        checkUser(usuario).then(exists => {
            create = !exists;
            console.log('create:', create);
            if (create) {
                let querystring = `INSERT INTO modelo_user (nome, usuario, senha) VALUES ('${nome}', '${usuario}', '${senha}');`;
                Database.query(querystring).then(results => {
                    resolve(results);
                }).catch(error => {
                    console.error(error);
                    reject(error);
                });
            } else {
                reject('User already exists!');
            }
        }).catch((error) => {
            reject(error);
        });
    });
}

 function checkUser(usuario) {
    let querystring = `SELECT * FROM modelo_user WHERE usuario = '${usuario}'`;
    return new Promise((resolve, reject) => {
        Database.query(querystring).then(results => {
                let exists = results.length > 0;
                resolve(exists);
            }).catch(error => {
                reject(error);
            });
        });
}

module.exports = router;
