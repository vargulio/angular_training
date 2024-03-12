interface HttpResponse<T> {
    status: number;
    ok: boolean;
    body: T
}

type BodyOnly1 = Pick<HttpResponse<any>, 'body' | 'status'>;