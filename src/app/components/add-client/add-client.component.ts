import { SettingsService } from './../../services/settings.service';
import { ClientService } from './../../services/client.service';
import { Router } from '@angular/router';
import { Client } from './../../models/Client';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnAdd: Boolean = true;
  disableBalanceOnEdit: Boolean = true;

  constructor(private flashMessagesService: FlashMessagesService,
    private router: Router,
    private clientService: ClientService,
    private settingsService: SettingsService) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      this.flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['add-client']);
    } else {
      // add new client
      this.clientService.newClient(value);
      this.flashMessagesService.show('New client added', { cssClass: 'success', timeout: 4000 });
      this.router.navigate(['/']);
    }
  }

}
