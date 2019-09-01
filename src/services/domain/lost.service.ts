import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { LostDTO } from "../../models/lost.dto";

@Injectable()
export class LostService {

    constructor(public http: HttpClient) {
    }

    insert(obj: LostDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/losts`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}