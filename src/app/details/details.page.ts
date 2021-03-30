import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  data: any;
  id: any;
  pickupLocation: string;

  constructor(private activateRouter: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.id = this.activateRouter.snapshot.paramMap.get('id');
    fetch('./assets/data.json')
      .then((json) => json.json())
      .then((data) => {
        data.map((data) => {
          if ((data.id = this.id)) {
            this.data = data;
          }
        });
      });
  }

  // Map
  onpickupClick() {
    this.router.navigate([
      'pickup-location',
      this.data.xlocation,
      this.data.ylocation,
    ]);
  }
}
