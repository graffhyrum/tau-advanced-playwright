import {assertString} from "./assertString";

const envHandler = () => {
    require('dotenv').config();
    const mainUser:User = {
        userName: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD
    }
    const baseTestUser:User = {
        userName: process.env.USERNAME_USER,
        password: process.env.TEST_PASSWORD
    }
    const adminTestUser:User = {
        userName: process.env.USERNAME_ADMIN,
        password: process.env.TEST_PASSWORD
    }

    const getMainUser = () => {
        assertUser(mainUser)
        return mainUser;
    }

    const getBaseTestUser = () => {
        assertUser(baseTestUser)
        return baseTestUser;
    }

    const getAdminTestUser = () => {
        assertString(adminTestUser.userName)
        assertString(adminTestUser.password)
        return adminTestUser;
    }

    return {
        getMainUser,
        getBaseTestUser,
        getAdminTestUser
    }
}

export default envHandler;


function assertUser(
    maybeUser: unknown,
    message?: string
): asserts maybeUser is User {
    if (typeof maybeUser !== 'object' || maybeUser === null)
        throw new Error(`maybeUser: ${maybeUser} isn't an object\n type:${typeof maybeUser}`);
    const user = maybeUser as User;
    assertString(user.userName, message);
    assertString(user.password, message);
}

type User = {
    userName: string,
    password: string
}

