import { mutate } from "$lib/graphql"

type EditUser = {
    email?: string,
    password?: string
}

const editUser = `
mutation EditUser($user: EditUserInput!) {
    editUser(user: $user) {
        id
        name
        email
    }
}`

export async function changeUser(user: EditUser) {
    return (await mutate(editUser, {user: user})).json()
}