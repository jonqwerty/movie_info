import { storage } from "@/storage/starage"

const BASE_URL = "http://10.0.2.2:8000/api/v1"

const token = storage.getString("token")

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
  error?: { code: string; fields: object }
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
    const response = await fetch(`${BASE_URL}/users`, {
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
    const response = await fetch(`${BASE_URL}/sessions`, {
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
    const response = await fetch(`${BASE_URL}/movies?sort=title&limit=1000`, {
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
    const response = await fetch(`${BASE_URL}/movies`, {
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
    console.log(data)
    return { data: data.data, status: data.status, error: data.error } as CreateMovieDto
  },
}
