import {Component, OnInit} from '@angular/core';
import {ClienteServiceService} from '../services/cliente-service.service';
import {Cliente} from '../cliente';
import {ActivatedRoute, Router} from '@angular/router';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  private excel: any;
  private cliente: Cliente = new Cliente();
  clientes:Cliente[] = [];
  file:File;
  arrayBuffer:any;
  filelist:any;

  constructor(private clienteService: ClienteServiceService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log(this.cargarCliente());
    console.log(this.route.snapshot.data);
  }

  cargarCliente() {
    this.route.params.subscribe(params => {
      console.log("params: ", params)
      let id: number = params['id']
      if (id) {
        this.clienteService.findById(id).subscribe((cliente) => this.cliente = cliente[0])
      }
    })
  }

  insert(): void {
    for(let i = 0;i<this.clientes.length;i++){
      this.clienteService.insert(this.clientes[i]).subscribe(response => {
      });
      this.router.navigate(['list']);
    }

    //this.upload();

  }

  upload(){
    this.clienteService.upload(this.file).subscribe(response => {
    });
      
  }

  update() {
    this.clienteService.updateById(this.cliente).subscribe(cliente => {
      this.router.navigate(['/list']);
  })
  }
  handleExcel(event:any):void{

    this.file= event.target.files[0];    

    let fileReader = new FileReader();    
    fileReader.readAsArrayBuffer(this.file);     
    fileReader.onload = (e) => {    
        this.arrayBuffer = fileReader.result;    
        var data = new Uint8Array(this.arrayBuffer);    
        var arr = new Array();    

        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]); 

        var hoja:any;
         var bstr = arr.join("");    
        var workbook = XLSX.read(bstr, {type:"binary"});
        var first_sheet_name = workbook.SheetNames[0]; 
        var worksheet = workbook.Sheets[first_sheet_name];   
        hoja = XLSX.utils.sheet_to_json(worksheet,{raw:true});

        for(let i = 0; i<hoja.length;i++){
        let clienteSave=new Cliente();
        clienteSave.nombres= hoja[i]['NOMBRE']
        clienteSave.apellidos= hoja[i]['APELLIDOS']
        clienteSave.area= hoja[i]['AREA']
        clienteSave.solicitud= hoja[i]['SOLICITUD']
        clienteSave.descripcion= hoja[i]['DESCRIPCION']
        clienteSave.anexo= hoja[i]['ANEXO']
        clienteSave.analistaAsignado= hoja[i]['ANALISTA']
        clienteSave.estado= hoja[i]['ESTADO']
        clienteSave.fechaRegistro= hoja[i]['REGISTRO']

        this.clientes.push(clienteSave)
        console.log('clientes',this.clientes)
        }
        //console.log('lista de clientes',this.clientes)
          var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
              this.filelist = [];    
              console.log(this.filelist)
      
    } 
  }
}
