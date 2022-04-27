import {sendRequest, rootApiUrl, sendRequestWithToken} from './http.service';

export const userLoginApi = async (request) => {
    return sendRequest(
        'POST',
        `${rootApiUrl}/api/login`,
        request
    );
}

export const userRegistrationApi = async (request) => {
    return sendRequest(
        'POST',
        `${rootApiUrl}/api/register`,
        request
    );
}

export const userLogoutApi = async () => {
    return sendRequestWithToken(
        'POST',
        `${rootApiUrl}/api/logout`
    );
}