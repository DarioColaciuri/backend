class UserRepository {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }

    create = (usuario) => {
        return this.UserRepository.create(usuario);
    }

    getBy = (filtro) => {
        return this.UserRepository.getBy(filtro);
    }

    updateLastConnection = (uid) => {
        return this.UserRepository.updateLastConnection(uid);
    }

    deleteInactiveUsers = () => {
        return this.UserRepository.deleteInactiveUsers();
    }

    updateDocuments = (uid, documents) => {
        return this.UserRepository.updateDocuments(uid, documents);
    }
}

export default UserRepository;