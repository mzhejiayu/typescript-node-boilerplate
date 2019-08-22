import * as express from 'express'
const app = express()
const port = 3002

class Car {
  private mark = "benz"
  public toString = (): String  => {
    return `${this.mark} car`
  }
}


const myCar = new Car()
app.get('/', (req: any, res: any) => res.send(`Hello ${myCar.toString()}`))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))