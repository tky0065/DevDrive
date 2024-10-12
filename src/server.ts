import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

class ServerBoostrap {

    public app: express.Application = express();
    private port: number = 8000;

  constructor() {
      this.app = express();
       this.app.use(morgan("dev"));
       this.app.use(cors());
       this.app.use(express.json());
       this.app.use(express.urlencoded({ extended: true }));
      this.start();
     
      this.routes();
  }



  routes() {
      this.app.use('/api/users', (req, res) => { 
        res.json({
          ok: true,
          message: 'All is ok!'
        });
      });
  }

  start(): void {
    this.app.listen(this.port, () => {
      console.log('Server on port', this.port);
    });
  }
}

new ServerBoostrap();