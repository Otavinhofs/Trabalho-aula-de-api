const { json, response } = require('express')
const express = require('express')
const app = express()
const PORT = 3000
let data = require('./app/data.json')

app.use(express.json())

app.post("/pokemons", (req, res) => {
    const {
        pokemon, id, type
    } = req.body

    if (!pokemon || !id || !type) {
        res.status(400).json({ error: "passe o body: pokemon, id, type" })
        return
    }
        data.push({pokemon, id, type})
        res.json({data})
   
})

app.get('/pokemons',(req, res) => {
    res.json(data)
})

app.get('/pokemons/:id', (req, res) => {
    const { id } = req.params
    const pokeId = data.find(poke => poke.id == id)
    if (!pokeId) {
        res.status(401).json({error: "Pokemon não encontrado pelo id"})
    } else {
        res.json(pokeId)
    }
})

app.put('/pokemons/:id', (req, res) => {
    const { id } = req.params
    const pokeId = data.find(poke => poke.id == id)

    if (!pokeId) {
        return res.status(401).json({error: "Pokemon não encontrado pelo id"})
    }

    const { pokemon, type } = req.body
    console.log(req.body)

    pokeId.pokemon = pokemon
    pokeId.type = type 
    res.json(pokeId)
})

app.delete('/pokemons/:id', (req, res) => {
    const { id } = req.params
    const pokemonFilter = data.filter(poke => poke.id != id)
    const pokemonIndex = data.findIndex(i => i.id == id)

    if (pokemonIndex < 0) {
        return res.status(404).json({error: "Id não encontrado"})
    } else {
        data = pokemonFilter
        res.json(pokemonFilter)
    }
})

app.listen(PORT, () =>  {
    console.log("Servidor disponivel")
})