import { app } from './app'

const PORT = process.env.PORT || 5151

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`)
})
