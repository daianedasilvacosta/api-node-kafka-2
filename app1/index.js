const express = require('express')
const kafka = require('kafka-node')
const app = express()
const sequelize = require('sequelize')
app.use(express.json())

const dbsAreRunning = async () => {
const db = new sequelize(process.env.POSTGRES_URL)
const User = db.define('user', {
    name: sequelize.STRING,
    email: sequelize.STRING,
    password: sequelize.STRING
})

db.sync({ force:true })
const client = new KafkaClient({kafkaHost: producer.env.KAFKA_BOOTSTRAP_SERVERS})
const producer = new kafka.Producer(client)
producer.on('ready', async() => {
    app.post('/', async (req,res) =>{
        producer.send([{topic:process.env.KAFKA_TOPIC,
            messages: JSON.stringify(req.body)}], async (err, data) => {
            if(err) console.log(err)
            else {
                await User.create(req.body)
                res.send(req.body)
                }
            }
            )
        })
    })
}
setTimeout(dbsAreRunning,10000)
  
app.listen(process.env.PORT)

// const express = require('express');
// const kafka = require('kafka-node');
// const { Sequelize } = require('sequelize');
// const app = express();
// app.use(express.json());

// // Função para verificar se os bancos de dados estão em execução
// const dbsAreRunning = async () => {
//   try {
//     // Conecte-se ao banco de dados Postgres
//     const db = new Sequelize(process.env.POSTGRES_URL);

//     // Defina o modelo de usuário
//     const User = db.define('user', {
//       name: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       password: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       }
//     });

//     // Sincronize o modelo com o banco de dados
//     await db.sync({ force: true });

//     // Conecte-se ao Kafka
//     const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS });
//     const producer = new kafka.Producer(client);

//     // Verifique quando o produtor Kafka está pronto
//     producer.on('ready', () => {
//       // Defina a rota POST
//       app.post('/', async (req, res) => {
//         try {
//           // Envie a mensagem ao Kafka
//           producer.send([{ topic: process.env.KAFKA_TOPIC, messages: JSON.stringify(req.body) }], async (err, data) => {
//             if (err) {
//               console.error(err);
//               res.status(500).send({ error: 'Erro ao enviar mensagem para o Kafka' });
//             } else {
//               // Crie um novo usuário no banco de dados
//               const newUser = await User.create(req.body);
//               res.status(201).send(newUser); // Envie o novo usuário criado como resposta
//             }
//           });
//         } catch (error) {
//           console.error(error);
//           res.status(500).send({ error: 'Erro ao processar a solicitação' });
//         }
//       });
//     });

//     // Lide com erros do produtor Kafka
//     producer.on('error', (err) => {
//       console.error('Erro no produtor Kafka', err);
//     });
//   } catch (error) {
//     console.error('Erro ao configurar o banco de dados ou Kafka', error);
//   }
// };

// // Aguarde 10 segundos antes de verificar os bancos de dados e o Kafka
// setTimeout(dbsAreRunning, 10000);

// // Inicie o servidor
// app.listen(process.env.PORT, () => {
//   console.log(`Servidor rodando na porta ${process.env.PORT}`);
// });
