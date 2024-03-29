import axios from "axios";
import { getUser } from "../auth/users.controller.js";
import { addPokemon, getTeam, removePokemon, setTeam } from "./teams.controller.js";

/**
 * Get the team of the authenticated user
 * @param {*} req
 * @param {*} res
 */
export const getTeamFromUser = async (req, res) => {
  let user = await getUser(req.user.userId)
  res.status(200).json({
    trainer: user.username,
    team: await getTeam(req.user.userId)
  })
}

/**
 * Set the team of the authenticated user
 * @param {*} req
 * @param {*} res
 */
export const setTeamToUser = async (req, res) => {
  await setTeam(req.user.userId, req.body.team)
  res.status(200).send()
}


/**
 * Add a pokemon to the team of the authenticated user
 * @param {*} req
 * @param {*} res
 */
export const addPokemonToTeam = (req, res) => {
  let pokemonName = req.body.name
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
    .then(async (response) => {
      let pokemon = {
        name: pokemonName,
        pokedexNumber: response.data.id
      }
      await addPokemon(req.user.userId, pokemon)
      res.status(201).json(pokemon)
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: error })
    })
}

/**
 * Delete a pokemon from the team of the authenticated user
 * @param {*} req
 * @param {*} res
 */
export const deletePokemonFromTeam = async (req, res) => {
  await removePokemon(req.user.userId, req.params.pokeId)
  res.status(200).send()
}