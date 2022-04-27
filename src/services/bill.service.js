import { rootApiUrl, sendRequestWithToken } from './http.service';

export const createBillApi = async (request) => {
    return sendRequestWithToken(
        'POST',
        `${rootApiUrl}/api/create-bill`,
        request
    );
}

export const updateBillApi = async (request) => {
    return sendRequestWithToken(
        'PUT',
        `${rootApiUrl}/api/update-bill/${request.id}`,
        request
    );
}

export const deleteBillApi = async (request) => {
    return sendRequestWithToken(
        'DELETE',
        `${rootApiUrl}/api/delete-bill/${request.id}`,
    );
}

export const getAllBillApi = async () => {
    return sendRequestWithToken(
        'GET',
        `${rootApiUrl}/api/get-all-bills`
    );
}

export const getReportBillApi = async () => {
    return sendRequestWithToken(
        'GET',
        `${rootApiUrl}/api/get-report-bills`
    );
}