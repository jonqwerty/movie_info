import { storage } from "@/storage/starage"
import { Platform } from "react-native"

const baseUrl = () => {
  const ip = storage.getString("ip")

  const BASE_URL =
    Platform.OS === "android" ? `http://${ip}:8000/api/v1` : "http://localhost:8000/api/v1"
  return BASE_URL
}

export type Format = "VHS" | "DVD" | "Blu-ray"

export type Actor = {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export type CreateUser = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type CreateMovie = {
  title: string
  year: number
  format: Format | string
  actors: string[]
}

export type SignInUser = {
  email: string
  password: string
}

export type UserDto = {
  status: number
  token?: string
  error?: { code: string; fields: object }
}

export type CreateMovieDto = {
  status: number
  token?: string
  error?: { code: string; fields: object; message: string }
  data: {
    id: number
    title: string
    year: number
    format: Format | string
    actors: Actor[]
    createdAt: Date
    updatedAt: Date
  }
}

export const movieApi = {
  createUser: async (userData: CreateUser) => {
    const response = await fetch(`${baseUrl()}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to create user")
    }

    const data = await response.json()

    return { token: data.token, status: data.status, error: data.error } as UserDto
  },

  signInUser: async (userData: SignInUser) => {
    const response = await fetch(`${baseUrl()}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to sign in user")
    }

    const data = await response.json()

    return { token: data.token, status: data.status, error: data.error } as UserDto
  },

  getMovies: async () => {
    const token = storage.getString("token")
    const response = await fetch(`${baseUrl()}/movies?sort=title&limit=1000`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to get movies")
    }

    const data = await response.json()

    return data
  },

  createMovie: async (movieData: CreateMovie) => {
    const token = storage.getString("token")
    const response = await fetch(`${baseUrl()}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(movieData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to create movie")
    }

    const data = await response.json()

    return { data: data.data, status: data.status, error: data.error } as CreateMovieDto
  },

  getMovie: async (id: string) => {
    const token = storage.getString("token")
    const response = await fetch(`${baseUrl()}/movies/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Failed to get movie with id:${id} `)
    }

    const data = await response.json()

    return data as CreateMovieDto
  },

  deleteMovie: async (id: string) => {
    const token = storage.getString("token")
    const response = await fetch(`${baseUrl()}/movies/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Failed to delete movie with id:${id} `)
    }

    const data = await response.json()

    return data as CreateMovieDto
  },
}
