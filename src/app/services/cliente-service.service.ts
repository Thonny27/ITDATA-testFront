import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cliente} from '../cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  private url = 'http://localhost:9060/manager-requieriments/v1/requirement';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  findAll(): Observable<any> {
    return this.http.get(this.url+'/list');
  }

  insert(cliente): Observable<any> {

    return this.http.post<Cliente>(this.url+'/add', cliente, {headers: this.httpHeaders});
  }

  upload(file: File){
    const formData: FormData = new FormData();
    formData.append('excel', file);

    return this.http.post<any>(this.url+'/uploadFile', formData, {headers: {'Content-Type': 'multipart/form-data'}});
  }

  delete(id: number){
    return this.http.delete<Cliente>(this.url+`/delete/${id}`,{headers: this.httpHeaders});
  }

  constructor(private http: HttpClient) {
  }

  findById(id: number) {
    return this.http.get<any>(this.url+`/list/${id}`,{headers: this.httpHeaders});
  }

  updateById(cliente:Cliente){
    return this.http.put<Cliente>(this.url+'/update',cliente,{headers: this.httpHeaders});
  }
}
