import { jwtDecode } from "jwt-decode"

type DecodedToken = {
  userId: string
  role: "admin" | "user"
  exp: number
}

export function getUserFromToken() {
  const token = localStorage.getItem("token")

  if (!token) return null

  try {
    const decoded = jwtDecode<DecodedToken>(token)

    const isExpired = decoded.exp * 1000 < Date.now()
    if (isExpired) {
      localStorage.removeItem("token")
      return null
    }

    return decoded
  } catch {
    localStorage.removeItem("token")
    return null
  }
}