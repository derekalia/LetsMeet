import rapidClient from './rapid'

export default createOrUpdateUser = (user) => {
    const users = rapidClient.collection('users')
    users.document(user.id)
        .merge(user)
        .then(() => true)
}