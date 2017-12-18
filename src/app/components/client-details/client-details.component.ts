import { Client } from './../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance: boolean;

  constructor(private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    // get id from Url
    this.id = this.route.snapshot.params['id'];
    // get client
    this.clientService.getClient(this.id).subscribe(client => {
      if (client !== null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
    });
  }

  updateBalance(id: string) {
    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show('Balance updated', { cssClass: 'success', timeout: 4000 });
    this.router.navigate(['/client/' + this.id]);
  }

  onDeleteClick() {

    if (confirm('Are you sure to delete?')) { this.clientService.deleteClient(this.id); }
    this.flashMessagesService.show('Client removed', { cssClass: 'success', timeout: 4000 });
    this.id = null;
    this.router.navigate(['/']);
  }

}
