
var Database = require('./Database');
var nome = document.getElementById('nome').value;
var end = document.getElementById('endereço').value;
var tel = document.getElementById('telefone').value;
var email = document.getElementById('email').value;
var senha = document.getElementById('senha').value;
var senhac = document.getElementById('senhac').value;
var usuario = document.getElementById('usuario').value;
     if (senha == senhac)
        {
            setInterval(() => 
               {
                Database.query(`INSERT INTO Cliente VALUES ('NULL','${nome}','${end}','${tel}','${email}','${senha}','${usuario}');`, (e, r) =>
                    {
                    if (e) 
                    {
                        console.error(e);
                    }
                    console.log('Success!');
                    });
                }, 1000);          
        }