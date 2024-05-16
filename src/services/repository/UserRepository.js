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
}

export default UserRepository;