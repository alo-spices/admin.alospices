import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class BeatPlanService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // Get All Beat Plans
  getAllBeatPlans(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/getall-beat-plans`
    );
  }


  // ==========================================
  // Create Beat Plan
  // ==========================================

  createBeatPlan(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/careate-beat-plans`,
      data
    );

  }

  // ==========================================
  // Get Beat Plan By ID
  // ==========================================

  getBeatPlanById(id: string): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/getbyid-beat-plans/${id}`
    );

  }


  // ==========================================
  // Update Beat Plan
  // ==========================================

  updateBeatPlan(
    id: string,
    data: any
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/update-beat-plans/${id}`,
      data
    );

  }

  // ==========================================
  // ASSIGN DELIVERY BOY TO BEAT PLAN
  // ==========================================

  assignDeliveryBoyToBeatPlan(
    beatPlanId: string,
    deliveryBoy: string
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/assign-delivery-boy/${beatPlanId}`,
      {
        deliveryBoy: deliveryBoy
      }
    );

  }


  assignDeliveryBoyToBeatPlans(payload: any) {

    return this.http.put(
      `${this.apiUrl}/assign-delivery-boy-to-beatplans`,
      payload
    );

  }

  // ==========================================
  // GET DELIVERY BOY BEAT PLANS
  // ==========================================

  getDeliveryBoyBeatPlans(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/get-delivery-boy-beat-plans`
    );

  }
}
