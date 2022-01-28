import { ProgramService } from 'src/app/services/program.service';
import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-program-url',
  templateUrl: './program-url.component.html',
  styleUrls: ['./program-url.component.scss'],
})
export class ProgramUrlComponent implements OnInit {
  error: any;
  program: any;

  url: any;
  scope: any;

  _openSeeds: boolean = false;
  _openEnum: boolean = true;
  _openDiscovery: boolean = false;
  _openMonitoring: boolean = false;

  executing: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public programService: ProgramService,
    public toolService: ToolsService,
    public wsService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.executing = true;
    this.route.params
      .subscribe((data) => {
        this.programService
          .GetProgram(data['url'])
          .subscribe(
            (data) => {
              console.log(data);
              this.program = data.data;
            },
            (error) => {
              console.error(error);
              if (!error.error.success) {
                this.error = error.error.msg;
              }
            }
          )
          .add(() => (this.executing = false));
      })
      .add(() => (this.executing = false));

    this.toolService
      .GetCompletedScan()
      .subscribe(
        (data: any) => {
          if (data.executing) {
            swal.fire({
              html: `<span style='color:grey'>${data.msg}<span>`,
              timer: 25000,
              showConfirmButton: false,
            });
          } else {
            swal.fire({
              html: `<span style='color:grey'>${data.msg}<span>`,
              timer: 1000,
              showConfirmButton: false,
            });
          }
        },
        (error) => {
          swal.fire({
            html: `<span style='color:grey'>${error.error.msg}<span>`,
            timer: 25000,
            showConfirmButton: false,
          });
        }
      )
      .add(() => (this.executing = false));
  }

  open(value) {
    switch (value) {
      case 1:
        this._openSeeds = true;
        this._openEnum = false;
        this._openDiscovery = false;
        this._openMonitoring = false;
        break;
      case 2:
        this._openSeeds = false;
        this._openEnum = true;
        this._openDiscovery = false;
        this._openMonitoring = false;
        break;
      case 3:
        this._openSeeds = false;
        this._openEnum = false;
        this._openDiscovery = true;
        this._openMonitoring = false;
        break;
      case 4:
        this._openSeeds = false;
        this._openEnum = false;
        this._openDiscovery = false;
        this._openMonitoring = true;
        break;
    }
  }

  executeCompleteScan(scope) {
    this.scope = scope;

    this.route.params.subscribe((data) => {
      this.url = data['url'];
    });

    let payload = {
      Url: this.url,
      Scope: this.scope,
    };

    this.toolService.WsExecuteCompleteScan(payload); // Ejecuto herramienta.
  }
}
