import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://34.101.71.138:8080/api/v1";

  constructor(private httpClient: HttpClient) { }

  /**
   * Get danh sách bảng chấm công
   */
  public getUsersCheckin(){
    return this.httpClient.get(`${this.REST_API_SERVER}/user`);
  }

  /**
   * Get dữ liệu user cụ thể
   */
  public getUsersById(id){
    return this.httpClient.get(`${this.REST_API_SERVER}/user/${id}`);
  }

  /**
   * Get dữ liệu user cụ thể
   */
  public getUsersByDate(day, month, year){
    return this.httpClient.get(`${this.REST_API_SERVER}/all/search-by-day?day=${day}&month=${month}&year=${year}`);
  }
}
