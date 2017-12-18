import { SettingsService } from './../../services/settings.service';
import { Component, OnInit } from '@angular/core';
import { Client } from './../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ClientService } from './../../services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  disableBalanceOnEdit: any;
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '', balance: 0
  };

  diableBalanceOnEdit = true;
  constructor(private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService,
    private settingsService: SettingsService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    // get client
    this.clientService.getClient(this.id).subscribe(client => { this.client = client; });
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (this.disableBalanceOnEdit) {
      value.balance = 0;
    }
    if (!valid) {
      this.flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['edit-client/' + this.id]);
    } else {
      // update client
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show('client updated', { cssClass: 'success', timeout: 4000 });
      this.router.navigate(['/client/'+this.id]);
    }
  }

}
