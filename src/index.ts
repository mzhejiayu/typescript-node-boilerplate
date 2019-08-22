import { fromEvent, from } from 'rxjs'
import * as express from 'express'
import { mergeMap, take, map, combineAll, reduce } from 'rxjs/operators'
import * as cass from 'cassandra-driver'

const promClient = require('prom-client')
const basicAuth = require('express-basic-auth')


const setENV = (name: string, defValue: string): string => {
  return process.env[name] ? process.env[name] : defValue
}

// -------------Initialize the environmnet---------------
const cassServers = setENV('CASS', 'localhost')
const dataCenter = setENV('DC', 'datacenter1')
const keySpace = setENV('KEYSPACE', 'local')
const table = setENV('TABLE', 'ref')
const port = setENV('PORT', '80')


// -------------Set the siginterrupt--------------------
from(['SIGINT', 'SIGTERM']).pipe(
  mergeMap(s => fromEvent(process, s))
).subscribe((d:any) => {
  process.exit(d[1])
})


// -------------------------------------------------------
const register = new promClient.Registry()


const client = new cass.Client({ contactPoints: cassServers.split(','), localDataCenter: dataCenter, keyspace: keySpace });
const query = `SELECT room, content, ts FROM ${table}`;
from(client.execute(query, [])).pipe(
  mergeMap(v => from(v.rows))
).subscribe({
  next: x => {
    console.info(x.keys())
  },
})
// When received terminate signal, must delete the program.

const app = express()
// --------------------Middlewares--------------------------
// app.use(basicAuth({
//   users: { 'admin': 'admin' },
//   challenge: true,
//   realm: 'Imb4T3st4pp',
// }))

app.get('/data/index.json', (req, res) => {
  res.set({"Content-Type": "text/csv"})
  from(client.execute(query, [])).pipe(
    mergeMap(v => from(v.rows)),
    reduce((ac, value) => {
      return ac +`${value.room},${value.ts},${value.content}\r\n`
    }, "room,date,content\r\n"),
    take(1),
  ).subscribe({
    next: x => {
      res.send(x)
    },
  })
})

// ----------------Prometheus counter----------------
const c = new promClient.Counter({
	name: 'test_counter',
	help: 'Example of a counter',
  labelNames: ['code'],
  registers: [register]
})

app.get('/metrics', (req, res) => {
  c.inc({code: 200})
  res.set('Content-Type', register.contentType)
  res.end(register.metrics())
})
app.listen(port, () => console.log(`app listening on port ${port}`))