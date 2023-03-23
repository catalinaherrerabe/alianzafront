import { Component , OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientModel } from 'src/app/model/client-model';
import { ClientsService } from 'src/app/service/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent implements OnInit{

  listClients: ClientModel []= [];
  formClient: FormGroup = new FormGroup({});
  isUpdate: boolean = false;
  sharedFind : string="";

  constructor(private clientService: ClientsService){

  }  
  
  ngOnInit(): void {
    this.list();

    this.formClient = new FormGroup({
      id: new FormControl(''),
      sharedkey: new FormControl(''),
      businessId: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      dateAdd: new FormControl(new Date())
    });

  }
  

  list(){
    this.clientService.getClients().subscribe(resp =>{
      if(resp){
        this.listClients=resp;
      }
    })
  }

  newClient(){
    this.isUpdate= false;
    this.formClient.reset();

  }

  save(){
    this.formClient.controls['dateAdd'].setValue(new Date());
    this.clientService.saveClient(this.formClient.value).subscribe(resp =>{
      if(resp){
        this.list();
        this.formClient.reset;
      }
    })
  }

  update(){
    this.formClient.controls['dateAdd'].setValue(new Date());
    this.clientService.saveClient(this.formClient.value).subscribe(resp =>{
      if(resp){
        this.list();
        this.formClient.reset;
      }
    })
  }

  selectItem(item: any){
    this.isUpdate= true;
    this.formClient.controls['id'].setValue(item.id);
    this.formClient.controls['sharedkey'].setValue(item.sharedkey);
    this.formClient.controls['businessId'].setValue(item.businessId);
    this.formClient.controls['email'].setValue(item.email);
    this.formClient.controls['phone'].setValue(item.phone);
    this.formClient.controls['dateAdd'].setValue(new Date());

  }

  findClient(sharedKey: string){
    this.clientService.getClientSharedKey(sharedKey).subscribe(resp =>{
      if(resp){
        this.listClients= [];
        this.listClients= resp;
      }
    })
  }


}
