export function logout(message?: string) {
    localStorage.removeItem("token");
  
    if (message) {
      sessionStorage.setItem("logout_message", message);
    }
  
    window.location.href = "/login";
  }