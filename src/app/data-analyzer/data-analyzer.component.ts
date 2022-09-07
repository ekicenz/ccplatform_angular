import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import {ApiRequestService} from '../api-request.service'

@Component({
  selector: 'app-data-analyzer',
  templateUrl: './data-analyzer.component.html',
  styleUrls: ['./data-analyzer.component.scss']
})


export class DataAnalyzerComponent implements OnInit {

  @Input() row_list: [];
  new_row_list: Object[];
  output_final: Object;
  chart: any;

  constructor(private apiservice: ApiRequestService) { }


  ngOnInit(): void {
    this.new_row_list = this.row_list;
  }


  ngAfterViewInit() {

    // sends request to python API and stores EDA data in output_final
    this.apiservice.post_data(this.new_row_list).subscribe(
      (response) => {
        console.log('Response Received')
        console.log(response)
        this.output_final = response

      }
    )
    console.log('Get all keys:');
    console.log(this.new_row_list);
    if (this.new_row_list.length > 0) {

      // variable holds all column headers
      let key_list = Object.keys(this.new_row_list[0]);
      // remove Date col name from list
      const index = key_list.indexOf('Date', 0);
      if (index > -1) {
         key_list.splice(index, 1);
      }

      // set elementID which is referenced in the frontend template
      let ctx: any = document.getElementById('lineChart') as HTMLElement;
      var labelList = [];
      var finalData = {};

      // create a dict with column names as keys and empty arrays as values
      for (let j = 0; j < key_list.length; j++) {
        finalData[key_list[j]] = [];
      }
      // populate data strutures for labels and
      for (let i = 0; i < this.new_row_list.length; i++) {
        let current_row = this.new_row_list[i];
        labelList.push(current_row['Date']);
        for (let k = 0; k < key_list.length; k++) {

          finalData[key_list[k]].push(current_row[key_list[k]]);
        }
      }
      console.log(labelList);
      console.log(finalData);

      let dataset_list = [];
      for (let j = 0; j < key_list.length; j++){
        var temp_entry = {label: key_list[j], data: finalData[key_list[j]], fill: false, lineTension: 0, radius: 5};
        dataset_list.push(temp_entry);
      }
      var mock_data = {labels: labelList, datasets: dataset_list};
      console.log(mock_data);

      /*      var data = {
        labels: ['match1', 'match2', 'match3', 'match4', 'match5'],
        datasets: [
          {
            label: 'TeamA Score',
            data: [10, 50, 25, 70, 40],
            backgroundColor: 'blue',
            borderColor: 'lightblue',
            fill: false,
            lineTension: 0,
            radius: 5,
          },
          {
            label: 'TeamB Score',
            data: [20, 35, 40, 60, 50],
            backgroundColor: 'green',
            borderColor: 'lightgreen',
            fill: false,
            lineTension: 0,
            radius: 5,
          },
        ],
      };*/

      // options
      var options = {
        responsive: true,
        title: {
          display: true,
          position: 'top',
          text: 'Line Graph',
          fontSize: 18,
          fontColor: '#111',
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: '#333',
            fontSize: 16,
          },
        },
      };
      var chart = new Chart(ctx, {
        type: 'line',
        data: mock_data,
        options: options,
      });
    }
  }




}
