import { HttpContext, HttpContextToken, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { filter, tap } from "rxjs";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    // Clone the request to add the authentication header.
    const newHeaders = req.headers.set('X-prashtame-pozdravi', 'bahur');
  
    
    let newReq = req.clone({headers: newHeaders});

    const TRIGGER_LOADER = new HttpContextToken(() => false);
    if(req.url.includes('pokeapi.co/api/v2/pokemon/11/')) {
        newReq = newReq.clone({
            context: new HttpContext().set(TRIGGER_LOADER, true)
        })
    }

    console.log(newReq.context.get(TRIGGER_LOADER));
    return next(newReq).pipe(
        filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
        tap((event: HttpEvent<any>) => {
        // console.log(event);
        if(newReq.context.get(TRIGGER_LOADER)) {
            console.log('WE SHOULD STOP THE LOADER');
            console.log(event);
        }
    }));
 }
 