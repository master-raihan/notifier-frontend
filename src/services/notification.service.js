import { rootApiUrl, sendRequestWithToken } from './http.service';

export const getAllNotificationApi = async () => {
    return sendRequestWithToken(
        'GET',
        `${rootApiUrl}/api/get-all-notifications`
    );
}