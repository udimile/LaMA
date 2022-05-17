import express, { Express } from 'express'
import cors from 'cors'
import { AddressInfo } from "net";
import { userRouter } from './routes/UserRouter';
import { bandRouter } from './routes/BandRouter';
import { showRouter } from './routes/ShowRouter'


const app: Express = express();

app.use(express.json());
app.use(cors());
app.use("/bands", bandRouter)
app.use("/users", userRouter)
app.use("/shows", showRouter)


const server = app.listen(process.env.PORT || 3003, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor funcionando no http://localhost:${address.port}`);
   } else {
      console.error(`Falha na inicialização do servidor.`);
   }
});