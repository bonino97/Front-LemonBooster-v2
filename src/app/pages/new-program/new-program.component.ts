import { ProgramService } from './../../services/program.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from "sweetalert2";

@Component({
  selector: 'app-new-program',
  templateUrl: './new-program.component.html',
  styleUrls: ['./new-program.component.scss']
})
export class NewProgramComponent implements OnInit {

  program: any[] = [];
  form: FormGroup;

  constructor(
    public programService: ProgramService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      Name: new FormControl('', Validators.required),
      Scopes: new FormControl('', Validators.required)
    });
  }

  addProgram(){

    var programName = '';

    if(this.form.invalid){
      return ;
    }

    if(this.form.valid){

      if(this.form.value.Name.indexOf(' ') > -1){
        const arrayName = this.form.value.Name.split(' ');
        
        arrayName.forEach(element => {
          programName += element;
        });
      } else {
        programName = this.form.value.Name;
      }
  
      const Scopes = [];
      const splitedScopes = this.form.value.Scopes.split(',');
  
      splitedScopes.forEach(element => {
        let scope = element.trim();
        Scopes.push(scope);
      });
  
      this.form.patchValue({
        Scopes,
        Name: programName
      });

      this.programService.AddProgram(this.form.value)
        .subscribe((data:any) => {
          if(data.success) {
            swal.fire({
              html: `<span style='color:grey'>${data.msg}<span>`,
              timer: 1200,
              showConfirmButton: false
            }).then( () => {
              this.router.navigate([`/programs/list`]);
            });
          }
      }, (error) => {
        console.error(error);
        swal.fire({
          html: `<span style='color:grey'>Please check your VPS connection on <a href="http://beta.lemonbooster.com/settings">Settings</a><span>`,
          timer: 25000,
          showConfirmButton: false,
        });
      });
    }
  }

}
