//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.0.3.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

export interface IClient {

    /**
     * @param body (optional) 
     * @return Success
     */
    register(body: CreateApplicationUserDto | undefined): Promise<void>;

    /**
     * @param body (optional) 
     * @return Success
     */
    login(body: LoginApplicationUserDto | undefined): Promise<AuthResponse>;

    /**
     * @param size (optional) 
     * @param page (optional) 
     * @return Success
     */
    blogPostsGET(size: number | undefined, page: number | undefined): Promise<PaginateBlogPostsDto>;

    /**
     * @return Success
     */
    blogPostsGET2(id: number): Promise<ReturnBlogPostDto>;

    /**
     * @param size (optional) 
     * @param page (optional) 
     * @return Success
     */
    blogPostsGET3(size: number | undefined, page: number | undefined): Promise<PaginateBlogPostsDto>;

    /**
     * @param body (optional) 
     * @return Success
     */
    blogPostsPOST(body: CreateBlogPostDto | undefined): Promise<number>;

    /**
     * @return Success
     */
    blogPostsGET4(id: number): Promise<ReturnBlogPostDto>;

    /**
     * @param body (optional) 
     * @return Success
     */
    blogPostsPUT(id: number, body: UpdateBlogPostDto | undefined): Promise<void>;

    /**
     * @return Success
     */
    blogPostsDELETE(id: number): Promise<void>;

    /**
     * @param size (optional) 
     * @param page (optional) 
     * @return Success
     */
    categoriesGET(size: number | undefined, page: number | undefined): Promise<PaginateCategoriesDto>;

    /**
     * @param body (optional) 
     * @return Success
     */
    categoriesPOST(body: CreateCategoryDto | undefined): Promise<void>;

    /**
     * @param body (optional) 
     * @return Success
     */
    categoriesPUT(id: number, body: UpdateCategoryDto | undefined): Promise<void>;

    /**
     * @return Success
     */
    categoriesDELETE(id: number): Promise<void>;

    /**
     * @param size (optional) 
     * @param page (optional) 
     * @return Success
     */
    commentsGET(size: number | undefined, page: number | undefined): Promise<PaginateCommentsDto>;

    /**
     * @param body (optional) 
     * @return Success
     */
    commentsPOST(body: CreateCommentDto | undefined): Promise<void>;

    /**
     * @param size (optional) 
     * @param page (optional) 
     * @return Success
     */
    commentsGET2(id: number, size: number | undefined, page: number | undefined): Promise<PaginateCommentsDto>;

    /**
     * @param body (optional) 
     * @return Success
     */
    commentsPUT(id: number, body: UpdateCommentDto | undefined): Promise<void>;

    /**
     * @return Success
     */
    commentsDELETE(id: number): Promise<void>;

    /**
     * @param body (optional) 
     * @return Success
     */
    search(body: GetSearchDto | undefined): Promise<PaginateBlogPostsDto>;

    /**
     * @param formFile (optional) 
     * @return Success
     */
    image(formFile: FileParameter | undefined): Promise<ImageUploadResponseDto>;
}

export class Client implements IClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl ?? "";
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    register(body: CreateApplicationUserDto | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Auth/register";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processRegister(_response);
        });
    }

    protected processRegister(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    login(body: LoginApplicationUserDto | undefined): Promise<AuthResponse> {
        let url_ = this.baseUrl + "/api/Auth/login";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processLogin(_response);
        });
    }

    protected processLogin(response: Response): Promise<AuthResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as AuthResponse;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<AuthResponse>(null as any);
    }

    /**
     * @param size (optional) 
     * @param page (optional) 
     * @return Success
     */
    blogPostsGET(size: number | undefined, page: number | undefined): Promise<PaginateBlogPostsDto> {
        let url_ = this.baseUrl + "/api/Auth/BlogPosts?";
        if (size === null)
            throw new Error("The parameter 'size' cannot be null.");
        else if (size !== undefined)
            url_ += "size=" + encodeURIComponent("" + size) + "&";
        if (page === null)
            throw new Error("The parameter 'page' cannot be null.");
        else if (page !== undefined)
            url_ += "page=" + encodeURIComponent("" + page) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processBlogPostsGET(_response);
        });
    }

    protected processBlogPostsGET(response: Response): Promise<PaginateBlogPostsDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as PaginateBlogPostsDto;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PaginateBlogPostsDto>(null as any);
    }

    /**
     * @return Success
     */
    blogPostsGET2(id: number): Promise<ReturnBlogPostDto> {
        let url_ = this.baseUrl + "/api/Auth/BlogPosts/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processBlogPostsGET2(_response);
        });
    }

    protected processBlogPostsGET2(response: Response): Promise<ReturnBlogPostDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ReturnBlogPostDto;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ReturnBlogPostDto>(null as any);
    }

    /**
     * @param size (optional) 
     * @param page (optional) 
     * @return Success
     */
    blogPostsGET3(size: number | undefined, page: number | undefined): Promise<PaginateBlogPostsDto> {
        let url_ = this.baseUrl + "/api/BlogPosts?";
        if (size === null)
            throw new Error("The parameter 'size' cannot be null.");
        else if (size !== undefined)
            url_ += "size=" + encodeURIComponent("" + size) + "&";
        if (page === null)
            throw new Error("The parameter 'page' cannot be null.");
        else if (page !== undefined)
            url_ += "page=" + encodeURIComponent("" + page) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processBlogPostsGET3(_response);
        });
    }

    protected processBlogPostsGET3(response: Response): Promise<PaginateBlogPostsDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as PaginateBlogPostsDto;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PaginateBlogPostsDto>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    blogPostsPOST(body: CreateBlogPostDto | undefined): Promise<number> {
        let url_ = this.baseUrl + "/api/BlogPosts";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processBlogPostsPOST(_response);
        });
    }

    protected processBlogPostsPOST(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as number;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    /**
     * @return Success
     */
    blogPostsGET4(id: number): Promise<ReturnBlogPostDto> {
        let url_ = this.baseUrl + "/api/BlogPosts/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processBlogPostsGET4(_response);
        });
    }

    protected processBlogPostsGET4(response: Response): Promise<ReturnBlogPostDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ReturnBlogPostDto;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ReturnBlogPostDto>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    blogPostsPUT(id: number, body: UpdateBlogPostDto | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/BlogPosts/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processBlogPostsPUT(_response);
        });
    }

    protected processBlogPostsPUT(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @return Success
     */
    blogPostsDELETE(id: number): Promise<void> {
        let url_ = this.baseUrl + "/api/BlogPosts/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processBlogPostsDELETE(_response);
        });
    }

    protected processBlogPostsDELETE(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param size (optional) 
     * @param page (optional) 
     * @return Success
     */
    categoriesGET(size: number | undefined, page: number | undefined): Promise<PaginateCategoriesDto> {
        let url_ = this.baseUrl + "/api/Categories?";
        if (size === null)
            throw new Error("The parameter 'size' cannot be null.");
        else if (size !== undefined)
            url_ += "size=" + encodeURIComponent("" + size) + "&";
        if (page === null)
            throw new Error("The parameter 'page' cannot be null.");
        else if (page !== undefined)
            url_ += "page=" + encodeURIComponent("" + page) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCategoriesGET(_response);
        });
    }

    protected processCategoriesGET(response: Response): Promise<PaginateCategoriesDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as PaginateCategoriesDto;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PaginateCategoriesDto>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    categoriesPOST(body: CreateCategoryDto | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Categories";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCategoriesPOST(_response);
        });
    }

    protected processCategoriesPOST(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    categoriesPUT(id: number, body: UpdateCategoryDto | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Categories/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCategoriesPUT(_response);
        });
    }

    protected processCategoriesPUT(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @return Success
     */
    categoriesDELETE(id: number): Promise<void> {
        let url_ = this.baseUrl + "/api/Categories/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCategoriesDELETE(_response);
        });
    }

    protected processCategoriesDELETE(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param size (optional) 
     * @param page (optional) 
     * @return Success
     */
    commentsGET(size: number | undefined, page: number | undefined): Promise<PaginateCommentsDto> {
        let url_ = this.baseUrl + "/api/Comments?";
        if (size === null)
            throw new Error("The parameter 'size' cannot be null.");
        else if (size !== undefined)
            url_ += "size=" + encodeURIComponent("" + size) + "&";
        if (page === null)
            throw new Error("The parameter 'page' cannot be null.");
        else if (page !== undefined)
            url_ += "page=" + encodeURIComponent("" + page) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCommentsGET(_response);
        });
    }

    protected processCommentsGET(response: Response): Promise<PaginateCommentsDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as PaginateCommentsDto;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PaginateCommentsDto>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    commentsPOST(body: CreateCommentDto | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Comments";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCommentsPOST(_response);
        });
    }

    protected processCommentsPOST(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param size (optional) 
     * @param page (optional) 
     * @return Success
     */
    commentsGET2(id: number, size: number | undefined, page: number | undefined): Promise<PaginateCommentsDto> {
        let url_ = this.baseUrl + "/api/Comments/{id}?";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        if (size === null)
            throw new Error("The parameter 'size' cannot be null.");
        else if (size !== undefined)
            url_ += "size=" + encodeURIComponent("" + size) + "&";
        if (page === null)
            throw new Error("The parameter 'page' cannot be null.");
        else if (page !== undefined)
            url_ += "page=" + encodeURIComponent("" + page) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCommentsGET2(_response);
        });
    }

    protected processCommentsGET2(response: Response): Promise<PaginateCommentsDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as PaginateCommentsDto;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PaginateCommentsDto>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    commentsPUT(id: number, body: UpdateCommentDto | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/Comments/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCommentsPUT(_response);
        });
    }

    protected processCommentsPUT(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @return Success
     */
    commentsDELETE(id: number): Promise<void> {
        let url_ = this.baseUrl + "/api/Comments/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCommentsDELETE(_response);
        });
    }

    protected processCommentsDELETE(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    search(body: GetSearchDto | undefined): Promise<PaginateBlogPostsDto> {
        let url_ = this.baseUrl + "/api/Search";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processSearch(_response);
        });
    }

    protected processSearch(response: Response): Promise<PaginateBlogPostsDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as PaginateBlogPostsDto;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PaginateBlogPostsDto>(null as any);
    }

    /**
     * @param formFile (optional) 
     * @return Success
     */
    image(formFile: FileParameter | undefined): Promise<ImageUploadResponseDto> {
        let url_ = this.baseUrl + "/api/Upload/Image";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = new FormData();
        if (formFile === null || formFile === undefined)
            throw new Error("The parameter 'formFile' cannot be null.");
        else
            content_.append("formFile", formFile.data, formFile.fileName ? formFile.fileName : "formFile");

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processImage(_response);
        });
    }

    protected processImage(response: Response): Promise<ImageUploadResponseDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ImageUploadResponseDto;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ImageUploadResponseDto>(null as any);
    }
}

export interface AuthResponse {
    userId?: string | undefined;
    token?: string | undefined;
    email?: string | undefined;
}

export interface CreateApplicationUserDto {
    email: string;
    password: string;
}

export interface CreateBlogPostDto {
    imgUrl: string;
    blogMdText: string;
    title: string;
    categories?: ReturnCategoryDto[] | undefined;
}

export interface CreateCategoryDto {
    categoryName: string;
    description: string;
}

export interface CreateCommentDto {
    name: string;
    email: string;
    comment1: string;
    blogPostId?: number | undefined;
    commentId?: number | undefined;
}

export interface GetSearchDto {
    categories?: ReturnCategoriesDto[] | undefined;
    search?: string | undefined;
}

export interface ImageUploadResponseDto {
    responseCode?: number;
    fileUrl?: string | undefined;
}

export interface LoginApplicationUserDto {
    email: string;
    password: string;
}

export interface PaginateBlogPostsDto {
    blogPostsDtos?: ReturnBlogPostsDto[] | undefined;
    numberOfElements?: number;
    currentPage?: number;
    hasPrev?: boolean;
    hasNext?: boolean;
}

export interface PaginateCategoriesDto {
    currentPage?: number;
    hasPrev?: boolean;
    hasNext?: boolean;
    categories?: ReturnCategoriesDto[] | undefined;
}

export interface PaginateCommentsDto {
    currentPage?: number;
    hasPrev?: boolean;
    hasNext?: boolean;
    comments?: ReturnCommentsDto[] | undefined;
}

export interface ReturnBlogPostDto {
    id?: number;
    imgUrl?: string | undefined;
    blogMdText?: string | undefined;
    createdDate?: string;
    updatedDate?: string;
    publishedDate?: string;
    published?: boolean;
    title?: string | undefined;
    categories?: ReturnCategoryDto[] | undefined;
}

export interface ReturnBlogPostsDto {
    id?: number;
    imgUrl?: string | undefined;
    blogMdText?: string | undefined;
    createdDate?: string;
    updatedDate?: string;
    publishedDate?: string;
    published?: boolean;
    title?: string | undefined;
}

export interface ReturnCategoriesDto {
    id?: number;
    categoryName?: string | undefined;
    description?: string | undefined;
    numberOfBlogPosts?: number;
}

export interface ReturnCategoryDto {
    id?: number;
    categoryName?: string | undefined;
    description?: string | undefined;
}

export interface ReturnCommentsDto {
    id?: number;
    name?: string | undefined;
    comment1?: string | undefined;
    blogPostId?: number | undefined;
    commentId?: number | undefined;
    createdDate?: string;
    inverseCommentNavigation?: ReturnCommentsDto[] | undefined;
}

export interface UpdateBlogPostDto {
    id: number;
    imgUrl: string;
    blogMdText: string;
    title: string;
    published?: boolean;
    categories?: ReturnCategoryDto[] | undefined;
}

export interface UpdateCategoryDto {
    id: number;
    categoryName: string;
    description: string;
}

export interface UpdateCommentDto {
    id: number;
    name: string;
    comment1: string;
}

export interface FileParameter {
    data: any;
    fileName: string;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}