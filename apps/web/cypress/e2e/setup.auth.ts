import {BACKEND_URL} from "./config";

export function login(email: string, password: string) {
    
    const options = {
        method: "POST",
        url: BACKEND_URL + "/auth/login",
        body: {
            email: email,
            password: password
        },
        headers: {
            "Content-Type": "application/json",
        },
    }
    cy.request(options).then((response) => {
        localStorage.setItem("user", JSON.stringify(response.body))
    })
}