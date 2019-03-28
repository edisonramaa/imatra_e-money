import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable()
export class EventService {
    private headerNotification: Subject<any> = new Subject<any>();

    setHeader(headerTitle: string): void {
        this.headerNotification.next(headerTitle);
    }

    getHeader(): Observable<any> {
        return this.headerNotification.asObservable();
    }

}