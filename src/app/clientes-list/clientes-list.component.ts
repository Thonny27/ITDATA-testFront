import {Component, OnInit} from '@angular/core';
import {ClienteServiceService} from '../services/cliente-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {

  clientes = [];


  constructor(private clienteService: ClienteServiceService, private router: Router) {
  }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.clienteService.findAll().subscribe((cliente: any) => {
      this.clientes = cliente;
      console.log('clientes: ', this.clientes);
    });
  }

  deleteById(id) {
    this.clienteService.delete(id).subscribe(response=>{
      this.findAll()

    })

  }

}
