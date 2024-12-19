export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export const studentUser = {
    id: '789e4567-e89b-12d3-a456-426614174000',
    name: 'Anakin Skywalker',
    email: 'anakin.skywalker@email.com.br',
    role: UserRole.USER,
    img: '',
    password: 'senhastarwars',
}

export const simpleUser = {
    name: 'Luke Skywalker',
    email: 'luke.skywalker@email.com.br',
    role: UserRole.USER,
    img: '',
    password: 'senhasecreta',
}

export const adminUser = {
        id: '6d78e1e5-5917-4a81-bce6-65610e79d4f1',
        name: 'Fred Durão',
        email: 'fred.durao@email.com.br',
        role: UserRole.ADMIN,
        img: '',
        password: 'senhaufba',
}

export const companyUser = {
    id: '09e1f3d8-6ff2-4187-8e99-55de3fb97040',
    name: 'NVidia',
    email: 'atendimento@nvidia.com',
    role: UserRole.USER,
    img: '',
    password: 'supernvidia',
}

