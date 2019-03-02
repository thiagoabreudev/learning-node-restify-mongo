import * as restify from 'restify'
import {enviroment} from '../common/enviroment'

export class Server {
    application: restify.Server
    initRoutes(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'meat-api', 
                    version: '1.0.0.'
                })
                // Plugin used to parser quer params in url browser    
                this.application.use(restify.plugins.queryParser())

                //routes 
                this.application.get('/info', (req, resp, next) => {
                    resp.json({
                        browser: req.userAgent(), 
                        method: req.method, 
                        url: req.href(), 
                        path: req.path(), 
                        query: req.query
                    })
                    return next()
                })

                this.application.listen(enviroment.server.port, ()=>{
                    resolve(this.application)
                })
                
            }catch(error) {
                reject(error)
            }
        })
    }

    bootstrap(): Promise<Server> {
        return this.initRoutes().then(() => this)
    }
}