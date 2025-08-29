export interface User {
  id: string
  email: string
  name?: string
}

export interface Note {
  id: string
  title: string
  content: string
  updated_at?: string
  created_at?: string
}

export interface AuthResponse {
  token: string
  user: User
}
