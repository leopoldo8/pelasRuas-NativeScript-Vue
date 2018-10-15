'use strict';
import $ from 'jquery';

class Api {
    constructor() {
        this.apiPath = 'http://localhost:3000';
    }

    request(method, path, data) {
        return new Promise((success, error) => {
            let ajaxOptions = {
                method: method,
                contentType: 'application/json',
                data: (data) ? JSON.stringify(data) : {},
                url: this.apiPath + path,
                success: (response) => {
                    let json = (typeof response !== 'object') ? JSON.parse(response) : response;
                    success(json);
                },
                error: (response) => {
                    let json = (typeof response.responseJSON !== 'object') ? JSON.parse(response.responseText) : response.responseJSON;
                    error(json);
                }
            };
            $.ajax(ajaxOptions);
        });
    }

    reqGetPosts() {
        return this.request('GET', '/posts');
    }

}
export {
    Api as
    default
};
