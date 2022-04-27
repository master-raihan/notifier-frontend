import { rootApiUrl, sendRequestWithToken } from './http.service';

export const createCategoryApi = async (request) => {
    return sendRequestWithToken(
        'POST',
        `${rootApiUrl}/api/create-category`,
        request
    );
}

export const getAllCategoryApi = async () => {
    return sendRequestWithToken(
        'GET',
        `${rootApiUrl}/api/get-all-categories`
    );
}

export const deleteCategoryApi = async (request) => {
    return sendRequestWithToken(
        'DELETE',
        `${rootApiUrl}/api/delete-category/${request.id}`,
    );
}