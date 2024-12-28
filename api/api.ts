const BASE_URL = "http://10.0.2.2:8000/api/v1"

export type CreateUser = {
  name: string
  email: string
  password: string
  confirmPassword: string
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
}
