import express from 'express';
import db from './models/db'
import * as bodyParser from 'body-parser';
import handlebars from 'express-handlebars'
import { loginSchema } from './controllers/validation'

const app = express();
const port = 3000;

app.use(bodyParser.json())

db.connect(err => {
  if (err) {
    console.log('Connection Database has faild ' + JSON.stringify(err, undefined, 2))
  }
  console.log('Connection of Database has been successfully done')
})

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  // res.send('The sedulous hyena ate the antelope!');
  res.render('home')
});

app.post('/', async (req, res) => {
  
  try {
    const user = await loginSchema.validateAsync(req.body);

    //  const result = await joiSchema.validateAsync(user)

    const sql = 'SET @login = ?;SET @pass = ?;CALL storage_db(@login,@pass);';
    db.query(sql, [user.login, user.pass], (err, data) => {
      if (err) {
        console.log(err)
        return res.status(500).send('Something going wrong!')
      }
      db.query('SELECT * FROM rabbit_db WHERE login = ?', [user.login], (errInner, dataInner) => {
        if (errInner) {
          console.log(errInner)
          return res.status(500).send('Something goes wrong!')
        }
        console.log(JSON.stringify(dataInner[0].login + ' has been successfully added'))
        res.json(dataInner)
      })
    })
  }
  catch (err) {
    if (err.isJoi === true) return res.status(422).json(err)
  }

})

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

/*
  1. Получаю таски от Amazon SNS через RabbitMQ
  2. Отправляю данные базы в 3d party provider
  3. Получаю данные от provider и отправляю их в PostgreSQL с join
  4. Отправляю данные в Callback Service
*/

// Поднять Worker(NodeJS+TS)

// Локально поднять RabbitMQ

// Соединить все RabbitMQ

// Получить данные из формы во View

// Потом в отдельном файле сделать валидцию Joi

// Записать результат в Model, потом PostgreSQL

// Сделать Controller Worker который будет console.log(data)