const SerialPort = require('serialport');
const config = require('../config').database;
const ReadLine = require('@serialport/parser-readline');
const sql = require('mssql');

sql.connect(config).then(connection => {
    SerialPort.list().then(ports => {
        ports.forEach(p => {
            if (p.manufacturer === 'Arduino LLC') {
                const arduino = new SerialPort(p.comName, {
                    baudRate: 9600,
                    autoOpen: true
                });

                let parser = new ReadLine();

                arduino.on('open', () => {
                    console.log(`Connected to Arduino on port ${p.comName}`);
                    arduino.pipe(parser);
                });

                parser.on('data', data => {
                    data = data.split(':');
                    return connection.request().input('temperatura', data[0])
                                        .input('umidade', data[1])
                                        .query(`INSERT INTO leitura (temperatura, umidade, momento)
                                                VALUES (@temperatura, @umidade, CURRENT_TIMESTAMP);`);
                }).then(result => {
                    console.log('Success!');
                    console.log(result);
                }).catch(error => {
                    console.error('Failed!');
                    console.error(error);
                });
            }
        });
    }).catch(error => {
        console.error(error);
    });
}).catch(error => {
    console.log(error);
});
