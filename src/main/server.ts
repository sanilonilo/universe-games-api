import app from './config/app'

const port = parseInt(process.env.PORT) || 3333

app.listen(port, () => console.log(`Server is running in port ${port}`))